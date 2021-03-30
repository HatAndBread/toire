# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

filepath = Rails.root + 'db/public_toilets.csv'


arr = []
CSV.foreach(filepath, headers: true) do |row|
  row_hash = row.to_h
  english_hash = {}
  english_hash[:facility_name] = row_hash["施設名"]
  english_hash[:address] = row_hash["都道府県"]
  english_hash[:building_name] = row_hash["ビル建物名"]
  english_hash[:floor] = row_hash["設置フロア"]
  english_hash[:longitude] = row_hash["経度"]
  english_hash[:latitude] = row_hash["緯度"]
  english_hash[:wheel_chair_accessible] = row_hash["車椅子が出入りできる（出入口の有効幅員80cm以上）"] == '○' ? true : false
  english_hash[:baby_ready] = row_hash["乳幼児用おむつ交換台等を備えている"] == '○' ? true : false
  english_hash[:url]
  if row_hash["性別の分け"] == '男性用'
    english_hash[:gender] = "men"
  elsif row_hash["性別の分け"] == '女性用'
    english_hash[:gender] = "women"
  else
    english_hash[:gender] = "both"
  end
  english_hash[:url_entrance_photo] = row_hash["写真データ（トイレの入り口）"]
  english_hash[:url_throne_photo] = row_hash["写真データ（トイレ内）"]


  arr << english_hash
end

puts arr[0]
