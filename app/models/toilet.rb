class Toilet < ApplicationRecord
    has_many :reviews, dependent: :destroy
end
