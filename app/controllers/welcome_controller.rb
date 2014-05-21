class WelcomeController < ApplicationController
	def index
    @tags = Farm.tag_counts_on(:tags, limit: 50, order: "count desc") 
	end

	def all

	end
end
