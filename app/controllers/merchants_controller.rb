class MerchantsController < ApplicationController
	before_filter :tag_names, only: [:new, :edit]
	
	def index
		@merchants = Merchant.all

		respond_to do |format|
			format.html {}
			format.js {}
		end
	end

	def new
		@farms = Farm.all
		@merchant = Merchant.new
	end

	def create
		@merchant = Merchant.new(merchant_params)
		farm_ids = params[:merchant][:farm_ids]
		@merchant.farm_ids = farm_ids
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
		params.require(:merchant).permit(:name, :address, :description, :phone_number, :website, :tag_list, :farm_ids => [])
	end

	def tag_names
		@tag_names = Farm.tag_counts.inject([]) do |array, tag| array.push(tag.name); array end
	end

end