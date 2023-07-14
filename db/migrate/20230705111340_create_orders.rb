class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.text :note
      t.integer :total_amount
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
