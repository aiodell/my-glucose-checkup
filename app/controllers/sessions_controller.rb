class SessionsController < ApplicationController
	skip_before_action :authenticate_user, except: :destroy
	
	# /POST start new session
	def create
		user = User.find_by_email(params[:email])
		if user&.authenticate(params[:password])
			session[:user_id] = user.id
			render json: user, status: :created
		else
			render json: { errors: ["Invalid username or password"]}, status: :unauthorized
		end
	end

	# /DELETE end the current session
	def destroy
		if session[:user_id]
			session.delete :user_id
			head :no_content
		else
			render json: { errors: ["Not Authorized"]}, status: :unauthorized
		end
	end
end
