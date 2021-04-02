class Toilet < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :photo_urls, dependent: :destroy
end
