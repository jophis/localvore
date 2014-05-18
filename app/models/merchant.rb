class Merchant < ActiveRecord::Base
	validates :name, :presence => true
	acts_as_taggable
	geocoded_by :address
	after_validation :geocode, if: :address_changed?
	has_and_belongs_to_many :farms
end
