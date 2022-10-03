class UsersController < ApplicationController
	skip_before_action :authenticate_user, only: :create
	
	def index
		render json: User.all, status: :ok
	end

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
		render json: User.find_by(id: session[:user_id]), status: :ok
	end

	private

	def user_params
		params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
	end

  end