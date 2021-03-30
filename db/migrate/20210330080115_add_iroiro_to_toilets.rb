class AddIroiroToToilets < ActiveRecord::Migration[6.1]
  def change
    add_column :toilets, :latitude, :float
    add_column :toilets, :longitude, :float
    add_column :reviews, :cleanliness_score, :integer
  end
end
