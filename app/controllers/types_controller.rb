class TypesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def index
    @types = Type.all
  end

  def show
  end

  def edit
  end

  def update
    if @type.update(type_params)
      redirect_to @type, notice: 'Category was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @type.destroy
    redirect_to categories_url, notice: 'Category was successfully destroyed.'
  end

  def show_products
    @type = Type.find(params[:id])
    @products = @type.product
    @favorite_exists = Favorite.where(product: @product, user: current_user) == [] ? false : true
    # @product = Product.find(params[:id])
  end

  private

  def set_category
    @type = Type.find(params[:id])
  end

  def type_params
    params.require(:type).permit(:name)
  end
end
