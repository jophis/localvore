class FarmsController < ApplicationController
	before_filter :tag_names only: [:new, :edit]

	def index
		# if params[:search]
		# 	@farms = @current_location.nearbys(1, units: :km)

		if params[:search]
			# not working with % for pattern match
			# @farms = Farm.tagged_with("%#{params[:search]}%")
			@farms = Farm.tagged_with(params[:search])
		elsif params[:tag]
			@farms = Farm.tagged_with(params[:tag])
		else
			@farms = Farm.all
		end

		# use near instead of created_at to show farms by distance, closest first
		@farms = @farms.order(created_at: :asc).page(params[:page])

		if params[:longitude] && params[:latitude]
			@farms = @farms.near([params[:latitude], params[:longitude]], 20)
		end

# autocomplete
		# if params[:term]
		# 	@farms = Farm.where("name ILIKE ?", "%#{params[:term]}%")
			# @farms_array = []
			# @farms.each do |farm|
			# 	@farms_array << farm.name
			# end
		# end

		respond_to do |format|
			format.html {}
			format.js {}
			format.json{ render json: @farms}    
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
		@farm = Farm.find(params[:id])
	end

	def update
		@farm = Farm.find(params[:id])

		if @restaurant.update_attributes(farm_params)
			redirect_to @farm
		else
			render :edit
		end
	end

	private
	def farm_params
		params.require(:farm).permit(:tag_list, :name, :address, :description, :phone_number, :website)
	end

	def tag_names
		@tag_names = Farm.tag_counts.inject([]) do |array, tag| array.push(tag.name); array end
	end
end
