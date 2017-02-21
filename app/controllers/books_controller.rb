class BooksController < ApplicationController
  before_action :set_, only: [:show, :edit, :update, :destroy]

  # GET /s
  # GET /s.json
  def index
    @s = Book.all
  end

  # GET /s/1
  # GET /s/1.json
  def show
  end

  # GET /s/new
  def new
    @ = Book.new
  end

  # GET /s/1/edit
  def edit
  end

  # POST /s
  # POST /s.json
  def create
    @ = Book.new(_params)

    respond_to do |format|
      if @.save
        format.html { redirect_to @, notice: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @ }
      else
        format.html { render :new }
        format.json { render json: @.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /s/1
  # PATCH/PUT /s/1.json
  def update
    respond_to do |format|
      if @.update(_params)
        format.html { redirect_to @, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @ }
      else
        format.html { render :edit }
        format.json { render json: @.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /s/1
  # DELETE /s/1.json
  def destroy
    @.destroy
    respond_to do |format|
      format.html { redirect_to s_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_
      @ = Book.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def _params
      params.require(:).permit(:title, :subtitle, :year, :author, :summary, :publisher)
    end
end
