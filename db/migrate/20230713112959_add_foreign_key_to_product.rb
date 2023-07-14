class AddForeignKeyToProduct < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :products, :types
  end
end
