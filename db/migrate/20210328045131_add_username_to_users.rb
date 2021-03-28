class AddUsernameToUsers < ActiveRecord::Migration[6.1]
  add_column :users, :username, :string
end
