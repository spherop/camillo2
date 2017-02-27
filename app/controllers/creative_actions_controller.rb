class CreativeActionsController < ApplicationController
  before_action :set_creative_action, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /creative_actions
  # GET /creative_actions.json
  def index
    @creative_actions = CreativeAction.all
  end

  # GET /creative_actions/1
  # GET /creative_actions/1.json
  def show
  end

  # GET /creative_actions/new
  def new
    @creative_action = CreativeAction.new
  end

  # GET /creative_actions/1/edit
  def edit
  end

  # POST /creative_actions
  # POST /creative_actions.json
  def create
    @creative_action = current_user.creative_actions.new(creative_action_params)
    respond_to do |format|
      if @creative_action.save
        format.html { redirect_to @creative_action, notice: 'Creative action was successfully created.' }
        format.json { render :show, status: :created, location: @creative_action }
      else
        format.html { render :new }
        format.json { render json: @creative_action.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /creative_actions/1
  # PATCH/PUT /creative_actions/1.json
  def update
    respond_to do |format|
      if @creative_action.update(creative_action_params)
        format.html { redirect_to @creative_action, notice: 'Creative action was successfully updated.' }
        format.json { render :show, status: :ok, location: @creative_action }
      else
        format.html { render :edit }
        format.json { render json: @creative_action.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /creative_actions/1
  # DELETE /creative_actions/1.json
  def destroy
    @creative_action.destroy
    respond_to do |format|
      format.html { redirect_to creative_actions_url, notice: 'Creative action was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_creative_action
      @creative_action = CreativeAction.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def creative_action_params
      params.require(:creative_action).permit(:title, :description, :notes, :user_id)
    end
end
