# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require Rails.root + 'db/public_toilets.rb'
require Rails.root + 'db/station_toilets.rb'

Review.delete_all
PhotoUrl.delete_all
Toilet.delete_all

public_toilets = get_public_toilets
station_toilets = get_station_toilets

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
  toilet.gender = current_toilet[:gender]
  toilet.floor = current_toilet[:floor] ? extract_number(current_toilet[:floor]) : nil
  toilet.save
  if current_toilet[:url_entrace_photo]
    photo_url_one = PhotoUrl.new( {url: current_toilet[:url_entrance_photo], area: 'entrance', toilet: toilet} )
    photo_url_one.save
  end
  if current_toilet[:url_throne_photo]
    photo_url_two = PhotoUrl.new( {url: current_toilet[:url_throne_photo], area: 'throne', toilet: toilet})
    photo_url_two.save
  end
  if current_toilet[:url_throne_two_photo]
    photo_url_three = PhotoUrl.new( {url: current_toilet[:url_throne_two_photo], area: 'throne', toilet: toilet})
    photo_url_three.save
  end
  rand(0..3).times do
    review = Review.new
    review.toilet = toilet
    review.user = Faker::Name.first_name
    review.cleanliness_score = rand(1..4)
    review.content = Faker::Restaurant.review
    review.save
    puts "Toilet with id #{toilet.id} has a new review! 💩
    #{review.user} had this to say: \"#{review.content}\". They gave it a cleanliness score of #{review.cleanliness_score}"
  end
  puts "A new toilet created at #{toilet.latitude}, #{toilet.longitude} 🚽"
end

public_toilets.each do |toilet|
  create_toilet(toilet)
end

station_toilets.each do |toilet|
  create_toilet(toilet)
end



