class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :user, presence: true
  validates :product, presence: true
  validates :user_id, uniqueness: {scope: :product_id, message: "Already favorited"}
end
