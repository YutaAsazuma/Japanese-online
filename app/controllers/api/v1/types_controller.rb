class Api::V1::TypesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  rescue_from StandardError, with: :handle_exception

  def index
    types = Type.all
    render json: types
  end

  def show
    render json: { type: type, product: type.product}
  end

  def edit
  end

  def update
    if type.update(type_params)
      redirect_to type, notice: 'Category was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    type.destroy
    redirect_to categories_url, notice: 'Category was successfully destroyed.'
  end

  def show_products
    @products = Product.where(type_id: params[:id])
    render json: @products.map { |product| product_with_favorites(product, current_user) }
  rescue => e
    render json: { error: e.message }, status: :internal_server_error
    # @product = Product.find(params[:id])
  end

  private

  def product_with_favorites(product, user)
    if user.nil?
      is_favorited = false
      favorite_id = nil
    else
      favorite = Favorite.find_by(user_id: user.id, product_id: product.id)
      is_favorited = !!favorite
      favorite_id = favorite&.id
    end

    image_urls = product.images.map { |img| img.url }

    product.as_json.merge(
      is_favorited: is_favorited,
      favorite_id: favorite_id,
      image_urls: image_urls
    )
  end

  def set_category
    @type = Type.find(params[:id])
  end

  def type_params
    params.require(:type).permit(:name)
  end

  def handle_exception(e)
    render json: { error: e.message }, status: :internal_server_error
  end
end
