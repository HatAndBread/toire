class Toilet < ApplicationRecord
  has_many :reviews, -> { order(created_at: :desc) }, dependent: :destroy
  has_many :photo_urls, dependent: :destroy
end
