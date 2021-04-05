def fizz_buzz(number)
  (1..number).map do | num |
    if num % 3 == 0
        num = 'fizz'
    else
        num
    end
  end
end

puts fizz_buzz(100)
