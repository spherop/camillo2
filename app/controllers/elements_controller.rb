class ElementsController < ApplicationController
  before_action :authenticate_user!
  def index 
    @elements = Element.all
  end
  
  def update
		@element = Element.find(params[:id])

		if @element.update(params[:element].permit(:name))
			redirect_to elements_path
		else
			render 'index'
		end
	end
end
