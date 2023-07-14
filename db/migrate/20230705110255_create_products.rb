class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.boolean :in_stok
      t.string :category

      t.timestamps
    end
  end
end
