class Farm < ActiveRecord::Base
	validates :name, :presence => true
	acts_as_taggable
  acts_as_taggable_on :fruits, :vegetables, :grains, :meat, :dairy, :nuts, :prepared, :beverages
	geocoded_by :address
	after_validation :geocode, if: :address_changed?
end
