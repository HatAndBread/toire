class RemoveCoordinatesAndCleanlinessFromToilets < ActiveRecord::Migration[6.1]
  def change
    remove_column :toilets, :coordinates
    remove_column :toilets, :cleanliness
  end
end
