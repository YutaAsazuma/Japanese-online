class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index]

  def index
    @products = Product.all
    render json: @products
  end

  def show
    @favorite_exists = Favorite.where(product: @product, user: current_user) == [] ? false : true
    render json: { product: @product, favorite_exists: @favorite_exists }
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)
    respond_to do |format|
      if @product.save

        format.html { redirect_to product_path(@product), notice: "Product was created" }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    if @product.update(product_params)
      redirect_to @product, notice: 'Product was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @product.destroy
    redirect_to products_url, notice: 'Product was successfully destroyed.'
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :price, :type_id, images: [])
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
