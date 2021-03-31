class Toilet < ApplicationRecord
    has_many :toilets, dependent: :destroy
end
