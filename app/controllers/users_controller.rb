class UsersController < ApplicationController
	skip_before_action :authenticate_user
	
	# /POST create new user
	def create
		@user = User.create!(user_params)
		if @user.valid?
			session[:user] = @user.id
			render json: @user, status: :created
		else
			render json: { errors: ["Invalid username or password"]}, status: :unprocessable_entity
		end
    end

	# /GET get a single user
	def show
		user = User.find_by(id: session[:user_id])
		if session[:user_id]
			render json: user, status: :ok
		else
			render json: { errors: ["Not Authorized"]}, status: :unauthorized
		end
	end

	private

	def user_params
		params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
	end

  end