class Api::V1::FavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @favorites = current_user.favorites
    render json: @favorites
  end

  def create
    @product = Product.find(params[:product_id])
    @user = User.find(current_user.id)
    @favorite = @user.favorites.create(product: @product)

    if @favorite.persisted?
      render json: { success: true, message: "Product added to favorites" }
    else
      render json: { success: false, message: @favorite.errors.full_messages[0] }
    end
  end

  def destroy
    favorite = Favorite.find(params[:id])
    unless favorite
      render json: { success: false, message: "Favorite not found" }, status: :not_found
      return
    end

    @product = favorite.product
    if favorite.destroy
      render json: { success: true, message: "Product removed from favorites" }
    else
      render json: { success: false, message: "Failed to remove from favorites" }
    end
  end
end
