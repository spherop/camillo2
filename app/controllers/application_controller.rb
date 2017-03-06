class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper DesignHelper
  
  protected
  def authenticate_user!
    if user_signed_in?
      super
    else
      respond_to do |format|
        format.html {
          redirect_to user_session_path
        }
        format.json {
          render :plain => "no_auth"
        }
      end
      
      ## if you want render 404 page
      ## render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
    end
  end
end
