class RemoveUserRelations < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :reviews, column: :user_id
  end
end
