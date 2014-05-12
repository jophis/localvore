class FarmsController < ApplicationController

	def index
		@farms = Farm.all
	end

	def new
		@farm = Farm.new
	end

	def create
		@farm = Farm.new(farm_params)

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
			params.require(:farm).permit(:name, :address, :description, :phone_number)
		end
end
