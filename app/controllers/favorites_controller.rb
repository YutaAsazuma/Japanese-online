class FavoritesController < ApplicationController
  def create
    @product = Product.find(parapms[:product_id])
    @favorite = current_user.favorites.new(product: @product)
    if favorite.save
      redirect_to product_path(@product), notice: "Added to favorite"
    else
      redirect_to product_path(@product), notice: @favorite.errors.full_messages[0]
    end
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @product = Product.where(user: current_user, favorite: @favorite)
    if favorite.destroy
      redirect_to product_path(@product), notice: "removed from favorite"
    else
      render "new"
    end
  end
end
