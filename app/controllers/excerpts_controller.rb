class ExcerptsController < ApplicationController
  before_action :set_excerpt, only: [:show, :edit, :update, :destroy]

  # GET /excerpts
  # GET /excerpts.json
  def index
    @excerpts = Excerpt.all
  end

  # GET /excerpts/1
  # GET /excerpts/1.json
  def show
  end

  # GET /excerpts/new
  def new
    @excerpt = Excerpt.new
  end

  # GET /excerpts/1/edit
  def edit
  end

  # POST /excerpts
  # POST /excerpts.json
  def create
    @excerpt = Excerpt.new(excerpt_params)

    respond_to do |format|
      if @excerpt.save
        format.html { redirect_to @excerpt, notice: 'Excerpt was successfully created.' }
        format.json { render :show, status: :created, location: @excerpt }
      else
        format.html { render :new }
        format.json { render json: @excerpt.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /excerpts/1
  # PATCH/PUT /excerpts/1.json
  def update
    respond_to do |format|
      if @excerpt.update(excerpt_params)
        format.html { redirect_to @excerpt, notice: 'Excerpt was successfully updated.' }
        format.json { render :show, status: :ok, location: @excerpt }
      else
        format.html { render :edit }
        format.json { render json: @excerpt.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /excerpts/1
  # DELETE /excerpts/1.json
  def destroy
    @excerpt.destroy
    respond_to do |format|
      format.html { redirect_to excerpts_url, notice: 'Excerpt was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_excerpt
      @excerpt = Excerpt.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def excerpt_params
      params.require(:excerpt).permit(:full_text, :short_text, :_id, :page_number, :commentary)
    end
end
