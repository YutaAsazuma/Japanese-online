class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index]

  def index
    products = Product.all
    render json: products
  end

  def show
    render json: product: product
  end

  def new
    product = Product.new
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json: product
    else
      render json: product, status: 422
    end
  end

  def edit
  end

  def update
    product = Product.new(product_params)
    if product.update
      render json: product
    else
      render json: product, status: 422
    end
  end

  def destroy
    product.destroy
    redirect_to products_url, notice: 'Product was successfully destroyed.'
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :price, :type_id, images: [])
  end

  def set_product
    product = Product.find(params[:id])
  end
end
