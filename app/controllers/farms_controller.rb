class FarmsController < ApplicationController

	def index

		# if params[:search]
		# 	@farms = @current_location.nearbys(1, units: :km)

		if params[:search]
			@farms = Farm.tagged_with(params[:search])
		elsif params[:tag]
			@farms = Farm.tagged_with(params[:tag])
		else
			@farms = Farm.all
		end

		if params[:longitude] && params[:latitude]
			@farms = @farms.near([params[:latitude], params[:longitude]], 20)
		end

		respond_to do |format|
      format.html {}
      format.js {}
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
			params.require(:farm).permit(:tag_list, :name, :address, :description, :phone_number, :website)
		end
end
