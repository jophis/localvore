class MerchantsController < ApplicationController
	autocomplete :farm, :name, :extra_data => [:address]
	before_filter :farm_names, only: [:new, :edit]
	before_filter :tag_names, only: [:new, :edit]

	
	def index
		@merchants = Merchant.all

		respond_to do |format|
			format.html {}
			format.js {}
		end
	end

	def new
		@merchant = Merchant.new
		@all_farms = Farm.all
		# @merchant_farm = @merchant.merchantfarms.build
	end

	def create
		@merchant = Merchant.new(merchant_params)
		if @merchant.save
			redirect_to @merchant
		else 
			render 'new'
		end
	end

	def show 
		@merchant = Merchant.find(params[:id])
	end

	def destroy
	end

	def edit
	end

	private
	def merchant_params
		params.require(:merchant).permit(:source_list, :name, :address, :description, :phone_number, :website)
	end

	def farm_names
		@farm_names = Farm.all.map do |farm| {id: farm.id, text: farm.name}
		end
	end

	def tag_names
		@tag_names = Farm.tag_counts.inject([]) do |array, tag| array.push(tag.name); array end
	end

	end