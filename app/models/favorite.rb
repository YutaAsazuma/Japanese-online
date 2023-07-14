class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :user, presence: true
  validates :concert, presence: true
  validates :concert_id, uniqueness: {scope: :user_id, message: "Already favorited"}
end
