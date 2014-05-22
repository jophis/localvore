class WelcomeController < ApplicationController
	def index
    @tags = Farm.tag_counts_on(:tags, order: "count desc") 
	end

	def all

	end
end
