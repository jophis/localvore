class FarmsController < ApplicationController
	before_filter :tag_names, only: [:new, :edit]
	before_filter :merchant_list, only: [:new, :edit]

	def index
		@farms = if params[:search]
			# not working with % for pattern match
			# @farms = Farm.tagged_with("%#{params[:search]}%")
			Farm.tagged_with(params[:search]).page(params[:page])
		elsif params[:tag]
			Farm.tagged_with(params[:tag]).page(params[:page])
		elsif params[:longitude] && params[:latitude]
			# near not working, believe to be caused by pagination
			Farm.near([params[:latitude], params[:longitude]], 20, units: :km).page(params[:page])
		else
			Farm.all.order(name: :asc).page(params[:page])
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
		params.require(:farm).permit(:tag_list, :name, :address, :description, :phone_number, :website, :vendor_list)
	end

	def tag_names
		@tag_names = Farm.tag_counts.inject([]) do |array, tag| array.push(tag.name); array end
	end

	def merchant_list
		@merchant_names = Merchant.all.map do |merchant| {id: merchant.id, text: merchant.name}
		end
	end
end
