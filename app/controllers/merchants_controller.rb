class MerchantsController < ApplicationController
	autocomplete :farm, :name, :extra_data => [:address]
	before_filer :load_farms, only: {:new, :create}

	
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
			params.require(:merchant).permit(:source_list, :merchant_farms, :name, :address, :description, :phone_number)
		end

		def load_farms
			@farms = Farm.all
		end

end
