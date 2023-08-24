class Api::V1::FavoritesController < ApplicationController
  def create
    product = Product.find(params[:product_id])
    favorite = current_user.favorite.new(product: @product)

    if favorite.save
      redirect_to  api_v1_product_path(@product)
    else
      redirect_to  api_v1_product_path(@product), notice: @favorite.errors.full_messages[0]
    end
  end

  def destory
    favorite = Favorite.find(params[:id])
    product = Product.where(user: current_user, favorite: @favorite)
    if favorite.destroy
      redirect_to  api_v1_product_path(@product)
    else
      render 'new'
    end
  end
end
