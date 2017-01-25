class UiController < ApplicationController
	before_action :authenticate_user!
end
