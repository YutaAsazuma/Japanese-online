class AdjustUsersIndex < ActiveRecord::Migration[7.0]
  def change
    if index_exists?(:users, [:uid, :provider], name: 'index_users_on_uid_and_provider')
      remove_index :users, name: 'index_users_on_uid_and_provider'
    end

    # Then remove the uid column if it exists
    remove_column :users, :uid if column_exists?(:users, :uid)
  end
end
