class AddForeignKeyToProduct < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :products, :types, null: false, foreign_key: true
  end
end
