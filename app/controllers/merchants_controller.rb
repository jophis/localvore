class MerchantsController < ApplicationController
	def index
		@merchants = Merchant.all
	end

	def new
		@merchant = Merchant.new
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
			params.require(:merchant).permit(:name, :address, :description, :phone_number)
		end
end
