class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  
  def index
    @items = current_user.items.all
		respond_to do |format|
	    format.html {
			}
	    format.json {
	    }
		end
  end
  
  def show
  end
  
  def update
    @item = current_user.items.find(params[:id])
    if @item.update(params[:item].permit(:title, :notes))
      respond_to do |format|
  	    format.html {
  				redirect_to @item
  			}
  	    format.json {
  	      render :json => @item.to_json
  	    }
  		end
      
    else
      render 'edit'
    end
  end

  
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
      params.require(:item).permit(:title, :description, :notes, :user_id, :action_date)
    end
end
