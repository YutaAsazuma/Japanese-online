class Product < ApplicationRecord
  belongs_to :type
  attachment :product_image
end
