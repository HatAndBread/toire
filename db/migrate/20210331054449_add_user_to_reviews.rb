class AddUserToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :user, :string
  end
end
