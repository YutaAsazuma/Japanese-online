class ChangeInStokToAmountOfStocksInProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :in_stok, :boolean
    add_column :products, :amount_of_stocks, :integer, default: 0
  end
end
