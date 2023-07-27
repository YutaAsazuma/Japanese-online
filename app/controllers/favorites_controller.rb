class FavoritesController < ApplicationController
  def update
    favorite = Favorite.where(product: Product.find(params[:product]), user: current_user)
    if favorite == []
      favorite.create(product: Product.find(params[:product]), user: current_user)
      @favorite_exists = true
    else
      favorite.destroy_all
      @favorite_exists = false
    end
    respond_to do |format|
      format.html {}
      format.js {}
    end
  end
end
