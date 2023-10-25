class Type < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :products, dependent: :destroy
  mount_uploader :image, ImageUploader
end
