class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index]
  before_action :authorize_user!, only: [:create, :update, :destroy]

  rescue_from ActiveRecord::RecordNotFound do
    render json: { error: "Product not found" }, status: 404
  end
  def index
    products = Product.all
    render json: products
  end

  def show
    render json: { product: @product }
  end

  def new
    product = Product.new
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json: product
    else
      Rails.logger.error("Product save failed with errors: #{product.errors.full_messages.join(', ')}")
      render json: { errors: product.errors.full_messages }, status: 422
    end
  end

  def edit
  end

  def update
    if product.update(product_params)
      render json: product
    else
      render json: { errors: @product.errors.full_messages }, status: 422
    end
  end

  def destroy
    @product.destroy
    render json: { message: 'Product was successfully destroyed.' }
  end

  private

  def authorize_user!
    unless current_user&.admin?
      render json: { error: "Not authorized" }, status: 403
    end
  end

  def product_params
    params.permit(:name, :description, :price, :amount_of_stocks, :type_id, images: [])
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
