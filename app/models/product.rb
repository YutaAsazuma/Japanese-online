class Product < ApplicationRecord
  validates :type_id, presence: true
  belongs_to :type
  mount_uploaders :images, ImageUploader
  serialize :images, JSON
end
