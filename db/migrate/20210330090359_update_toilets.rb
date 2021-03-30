class UpdateToilets < ActiveRecord::Migration[6.1]
  def change
    add_column :toilets, :facility_name, :string
    add_column :toilets, :building_name, :string
    add_column :toilets, :floor, :integer
  end
end
