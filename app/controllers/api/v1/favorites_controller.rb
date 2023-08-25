class Api::V1::FavoritesController < ApplicationController

  def index
    @favorites = current_user.favorites
    render json: @favorites
  end

  def create
    @product = Product.find(params[:product_id])
    @favorite = current_user.favorites.new(product: @product)

    if @favorite.save
      render json: { success: true, message: "Product added to favorites" }
    else
      render json: { success: false, message: @favorite.errors.full_messages[0] }
    end
  end

  def destroy
    favorite = Favorite.find(params[:id])
    @product = favorite.product
    if favorite.destroy
      redirect_to  api_v1_product_path(@product)
    else
      render 'new'
    end
  end
end
