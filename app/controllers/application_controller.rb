class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper DesignHelper
  
  protected
  def authenticate_user!
    auth_token = request.headers['Authorization']
    if auth_token
      authenticate_with_auth_token auth_token
    else    
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
    
    private

    def authenticate_with_auth_token auth_token 
      unless auth_token.include?(':')
        authentication_error
        return
      end

      user_id = auth_token.split(':').first
      user = User.where(id: user_id).first

      if user && Devise.secure_compare(user.access_token, auth_token)
        # User can access
        sign_in user, store: false
      else
        authentication_error
      end
    end

    ## 
    # Authentication Failure
    # Renders a 401 error
    def authentication_error
      # User's token is either invalid or not in the right format
      render json: {error: 'unauthorized'}, status: 401  # Authentication timeout
    end
end
