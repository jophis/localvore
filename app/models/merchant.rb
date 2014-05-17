class Merchant < ActiveRecord::Base
	validates :name, :presence => true
	acts_as_taggable
	geocoded_by :address
	after_validation :geocode, if: :address_changed?
	has_many :merchantfarms
	has_many :farms, :through => :merchantfarms
end
