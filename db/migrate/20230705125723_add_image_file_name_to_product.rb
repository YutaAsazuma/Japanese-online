class AddImageFileNameToProduct < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :image_filename, :string
  end
end
