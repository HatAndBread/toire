require 'csv'
require 'natto'
require 'romaji'



def furigantz(s)
  nm = Natto::MeCab.new
  memo = []
  nm.parse(s) do |n|
    if n.feature
      arr = n.feature.split(',')
      memo << Romaji.kana2romaji(arr[7]) if arr[7]
    end
  end
  memo.delete('*')
  string = memo.join
  if string.class == String && string[0].class == String
    begin
      string[0] = string[0].upcase!
    rescue
      return string
    else
      return string
    end
  end
end

def get_company(name)
    return 'Odakyu' if name == "小田急電鉄"
    return 'Keio' if name == "京王電鉄"
    return 'Keisei' if name == "京成電鉄"
    return 'Keihin' if name == "京浜急行電鉄"
    return 'Tsukuba Express' if name == "首都圏新都市鉄道"
    return 'Takao' if name == "高尾登山電鉄"
    return 'Tama Monorail' if name == "多摩都市モノレール"
    return 'Tokyu' if name == "東京急行電鉄"
    return 'Tokyo Metro' if name == "東京地下鉄"
    return 'Tokyo Monorail' if name == "東京モノレール"
    return 'Tokyo Rinkai' if name == "東京臨海高速鉄道"
    return 'Tobu' if name == "東武鉄道"
    return 'JR' if name == "東日本旅客鉄道"
    return 'Hokuso' if name == "北総鉄道"
    return 'Yurikamome' if name == "ゆりかもめ"
    return ''

end


public_toilets = []
station_toilets = []
CSV.foreach('public_toilets.csv', headers: true) do |row|
  row_hash = row.to_h
  english_hash = {}
  english_hash[:facility_name] = row_hash["施設名"] ? furigantz(row_hash["施設名"]) : nil
  english_hash[:address] = row_hash["都道府県"]
  english_hash[:address] << row_hash["市区町村・番地"] if row_hash["市区町村・番地"]
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
  english_hash[:url_throne_two_photo] = row_hash["写真データ（トイレ内（別角度））"]
  public_toilets << english_hash
end


CSV.foreach('station_toilets.csv', headers: true) do |row|
  row_hash = row.to_h
  english_hash = {}
  if row_hash["鉄道会社名"]
    english_hash[:facility_name] = "#{get_company(row_hash["鉄道会社名"])} #{furigantz(row_hash["鉄道駅名"])} Station"
    english_hash[:address] = row_hash["都道府県"]
    english_hash[:address] << row_hash["市区町村・番地"] if row_hash["市区町村・番地"]
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
    english_hash[:url_throne_two_photo] = row_hash["写真データ（トイレ内（別角度））"] 
    station_toilets << english_hash
  end
end


puts "public toilets!"
puts public_toilets[0]

puts "station toilets!"
puts station_toilets[0]


File.open('station_toilets.rb', 'w') { |file| file.write("
def get_station_toilets
  arr = #{station_toilets}
  return arr
end
") }

File.open('public_toilets.rb', 'w') { |file| file.write("
def get_public_toilets
  arr = #{public_toilets}
  return arr
end
") }