class WelcomeController < ApplicationController
	def index
    @tags = Farm.tag_counts_on(:tags, limit: 25, order: "count desc") 
	end
end
