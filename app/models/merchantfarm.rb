class Merchantfarm < ActiveRecord::Base
	belongs_to :farm
	belongs_to :merchant
end
