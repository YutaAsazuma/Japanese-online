class Api::V1::FavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    favorites = current_user.favorites
    render json: favorites
  end

  def create
    product = Product.find(params[:product_id])
    favorite = current_user.favorites.find_by(product: product)

    if favorite
      render json: { success: false, message: "Already favorited" }
    else
      favorite = current_user.favorites.create(product: product)
      render json: { success: true, favoriteId: favorite.id}
    end
  end

  def destroy
    product = Product.find(params[:product_id])
    favorite = current_user.favorites.find_by(product: product)
    # unless @favorite
    #   render json: { success: false, message: "Favorite not found" }, status: :not_found
    #   return
    # end

    # @product = favorite.product
    if favorite
      favorite.destroy
      render json: { success: true, message: "Product removed from favorites" }
    else
      render json: { success: false, message: "Favorite not found" }, status: :not_found
    end
  end
end
