require Rails.root + 'db/public_toilets.rb'
require Rails.root + 'db/station_toilets.rb'

Review.delete_all
PhotoUrl.delete_all
Toilet.delete_all

def get_fake_review 
  fake_reviews = [
  "I saw one of these in French Southern and Antarctic Lands and I bought one.",
  "My neighbor Frona has one of these.",
  "This toilet works very well.",
  "I tried to nail it but got strawberry all over it.",
  "This toilet is tasty.",
  "Absolutely amazing. Best one yet.",
  "This toilet works certainly well.",
  "This toilet works very well. ",
  "My co-worker Matthew has one of these. He says it looks gigantic.",
  "this toilet is mellow.",
  "It works absolutely as it is supposed to",
  "I haven't had such a fine experience with a toilet in many years",
  "Best toilet in Tokyo hands down",
  "Not bad but not great either",
  "One of a kind. Great!",
  "It only works when I'm Nepal.",
  "My neighbor Zoa has one of these. She works as a scribe and she says it looks wide.",
  "I tried to attack it but got meatball all over it.",
  "Talk about pleasure!",
  "This toilet is standard.",
  "I tried to manhandle it but it got the best of me.",
  "My co-worker Delton says this one is the best.",
  "If you haven't used this toilet yet drop what you're doing right now and go try it.",
  "Quite nice!",
  "Leaves much to be desired",
  "I had a hard time finding it, but it was an overall pleasant experience",
  "Never have I had so much fun with a toilet",
  "My favorite",
  "I visit here regularly",
  "Truly one of the best I have seen yet. Outstanding!",
  "It's pretty good",
  "I love it!",
  "This one is quite nice. I like it a lot.",
  "One of the better toilets in this particular area.",
  "Not that great, but you got to go when you got to go.",
  "Truly amazing!",
  "Five stars!",
  "One of the better toilets I have met",
  "I loved it. Will go again and again.",
  "Not too shabby!",
  "An overall pleasant experience. I will take my friend Mike there next time.",
  "Too beautiful for words.",
  "Great! Just great!",
  "I never　get tired of going here.",
  "Wonderful!",
  "My pet rabbit lives here!",
  "I once saw a tanuki come out of there, but overall very nice.",
  "Strange smells but pretty",
  "I liked it very much. Would recommend it to anyone",
  "Had a very pleasant experience",
  "Not what I expected, but still very nice",
  "What else can I say, amazing!"
]
fake_reviews.sample
end

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
  rand(0..2).times do
    review = Review.new
    review.toilet = toilet
    review.user = Faker::Name.first_name
    review.cleanliness_score = rand(1..4)
    review.content = get_fake_review
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



