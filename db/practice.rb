require 'date'
def age_in_days(day, month, year)
  # TODO: return the age expressed in days given the day, month, and year of birth
  birthdate = Date.new(year, month, day)
  today = Date.today
  puts birthdate
  return (today - birthdate).to_i / 365.25
end

puts age_in_days(16, 9, 1975)