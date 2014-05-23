class WelcomeController < ApplicationController
	def index
    @merchants = Merchant.all
    @tags = Farm.tag_counts_on(:tags, order: "count desc") 
    @farms = if params[:search]
      Farm.tagged_with(params[:search], :wild => true, :any => true)
    else
      Farm.all
    end

    respond_to do |format|
      format.html
      format.js
      format.json{ render json: @farms}    
    end
  end
end
