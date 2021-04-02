class AddGenderToToilets < ActiveRecord::Migration[6.1]
  def change
    add_column :toilets, :gender, :string
  end
end
