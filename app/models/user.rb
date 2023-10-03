class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable,
    :registerable, :recoverable, :validatable,
    :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :favorites
  has_many :favorited_products, through: :favorites, source: :product

  validates :email, presence: true
  validates :password, presence: true, length: { minimum: 6 }
end
