class merchants_farms < ActiveRecord::Base
	belongs_to :farm
	belongs_to :merchant
end
