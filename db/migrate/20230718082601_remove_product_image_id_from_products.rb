class RemoveProductImageIdFromProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :product_image_id, :string
  end
end
