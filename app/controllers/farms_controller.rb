class FarmsController < ApplicationController

	def index
		if params[:tag]
			@farms = Farm.tagged_with(params[:tag])
		else
			@farms = Farm.all
		end
	end

	def new
		@farm = Farm.new
	end

	def create
		@farm = Farm.new(farm_params)
		puts "My Farm is currently #{@farm.inspect}"
		if @farm.save
			redirect_to @farm
		else 
			render 'new'
		end
	end

	def show 
		@farm = Farm.find(params[:id])
	end

	def destroy
	end

	def edit
	end

	private
		def farm_params
			params.require(:farm).permit(:tag_list, :name, :address, :description, :phone_number)
		end
end
