class RemoveUserColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :reviews, :user_id
    drop_table :users
  end
end
