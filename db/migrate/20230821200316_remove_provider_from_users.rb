class RemoveProviderFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :provider, :string
  end
end
