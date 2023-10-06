class Product < ApplicationRecord
  validates :type_id, presence: true
  has_many :favorites
  has_many :favorited_users, through: :favorites, source: :user
  belongs_to :type
  mount_uploaders :images, ImageUploader
  serialize :images, JSON

  def is_favorited?(user)
    return false unless user
    favorites.where(user_id: user.id).exists?
  end

  def favorite_id(user)
    favorite = favorites.find_by(user: user)
    favorite.id if favorite
  end

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
