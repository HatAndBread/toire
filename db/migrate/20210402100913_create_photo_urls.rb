class CreatePhotoUrls < ActiveRecord::Migration[6.1]
  def change
    create_table :photo_urls do |t|
      t.references :toilet, null: false, foreign_key: true
      t.string :url
      t.string :area

      t.timestamps
    end
  end
end
