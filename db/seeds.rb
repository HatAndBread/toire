# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require Rails.root + 'db/public_toilets.rb'
require Rails.root + 'db/station_toilets.rb'

Toilet.delete_all

public_toilets = get_public_toilets
station_toilets = get_station_toilets

current_toilet = station_toilets[0]

def extract_number(string)
  if string.class == String
    num = ''
    string.split('').each do |char|
      num += char if 48 <= char.ord && char.ord <= 57
    end
    return num.to_i
  elsif string.class == Integer
    return string
  else
    return nil
  end
end

def create_toilet(current_toilet)
  toilet = Toilet.new
  toilet.wheel_chair_accessible = current_toilet[:wheel_chair_accessible]
  toilet.baby_ready = current_toilet[:baby_ready]
  toilet.latitude = current_toilet[:latitude]
  toilet.longitude = current_toilet[:longitude]
  toilet.facility_name = current_toilet[:facility_name]
  toilet.building_name = current_toilet[:building_name]
  toilet.floor = current_toilet[:floor] ? extract_number(current_toilet[:floor]) : nil
  toilet.save
  puts "A new toilet created at #{toilet.latitude}, #{toilet.longitude} 🚽"
end

public_toilets.each do |toilet|
  create_toilet(toilet)
end

station_toilets.each do |toilet|
  create_toilet(toilet)
end
