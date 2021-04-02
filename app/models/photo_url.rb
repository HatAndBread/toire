class PhotoUrl < ApplicationRecord
  belongs_to :toilet
  validates :url, presence: true
end
