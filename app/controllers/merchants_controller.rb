class MerchantsController < ApplicationController
	autocomplete :farm, :name, :extra_data => [:address]
	
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
		@merchant_farm = @merchant.merchantfarms.build
	end

	def create
		@merchant = Merchant.new(merchant_params)
		# code for youtube multi select form tut
		# params[:farms][:id].each do |farm|
		# 	if !farm.empty?
		# 		@merchant.merchantfarms.build(:farm_id => farm)
		# 	end
		# end

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
			params.require(:merchant).permit(:source_list, :merchant_farms, :name, :address, :description, :phone_number)
		end
end
