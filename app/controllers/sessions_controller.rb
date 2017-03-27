
  class  SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    skip_before_action :authenticate_user!, raise: false

    def create
      
      @user = User.find_for_database_authentication(email: params[:session][:email])
      return invalid_login_attempt unless @user
      if @user.valid_password?(params[:session][:password])
        sign_in :user, @user
        render json: @user, root: nil
      else
        invalid_login_attempt
      end
    end

    private

    def invalid_login_attempt
      warden.custom_failure!
      render json: {error: 'sessions_controller.invalid_login_attempt'}, status: :unprocessable_entity
    end

  end
