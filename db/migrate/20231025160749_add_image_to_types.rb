class AddImageToTypes < ActiveRecord::Migration[7.0]
  def change
    add_column :types, :image, :string
  end
end
