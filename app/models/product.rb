class Product < ApplicationRecord
  validates :type_id, presence: true
  has_many :favorites, dependent: :destroy
  belongs_to :type
  mount_uploaders :images, ImageUploader
  serialize :images, JSON

  def purchase(amount)
    raise ArgumentError, "Amount should be positive" if amount <= 0

    if self.amount_of_stocks >= amount
      self.amount_of_stocks -= amount
      self.save
    else
      raise StandardError, "Insufficient stock"
    end
  end
end
