class CreateToilets < ActiveRecord::Migration[6.1]
  def change
    create_table :toilets do |t|
      t.integer :cleanliness
      t.boolean :wheel_chair_accessible, default: false
      t.boolean :baby_ready, default: false
      t.string :coordinates

      t.timestamps
    end
  end
end
