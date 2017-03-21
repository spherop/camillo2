class JournalPagesController < ApplicationController
  before_action :set_journal_page, only: [:show, :edit, :update, :destroy]

  # GET /journal_pages
  # GET /journal_pages.json
  def index
    @journal_pages = JournalPage.all
  end

  # GET /journal_pages/1
  # GET /journal_pages/1.json
  def show
  end

  # GET /journal_pages/new
  def new
    @journal_page = JournalPage.new
  end

  # GET /journal_pages/1/edit
  def edit
  end

  # POST /journal_pages
  # POST /journal_pages.json
  def create
    @journal_page = JournalPage.new(journal_page_params)

    respond_to do |format|
      if @journal_page.save
        format.html { redirect_to @journal_page, notice: 'Journal page was successfully created.' }
        format.json { render :show, status: :created, location: @journal_page }
      else
        format.html { render :new }
        format.json { render json: @journal_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /journal_pages/1
  # PATCH/PUT /journal_pages/1.json
  def update
    respond_to do |format|
      if @journal_page.update(journal_page_params)
        format.html { redirect_to @journal_page, notice: 'Journal page was successfully updated.' }
        format.json { render :show, status: :ok, location: @journal_page }
      else
        format.html { render :edit }
        format.json { render json: @journal_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /journal_pages/1
  # DELETE /journal_pages/1.json
  def destroy
    @journal_page.destroy
    respond_to do |format|
      format.html { redirect_to journal_pages_url, notice: 'Journal page was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_journal_page
      @journal_page = JournalPage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def journal_page_params
      params.fetch(:journal_page, {})
    end
end
