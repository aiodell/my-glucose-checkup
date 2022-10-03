class ProfilesController < ApplicationController

	def create
		profile = Profile.create!(profile_params)
		render json: profile, status: :created
	end

	def show
		@profile = Profile.find_by(user_id: session[:user_id], id: params[:id])
		render json: @profile, status: :ok
	end

	def update
		profile = Profile.find_by(user_id: session[:user_id], id: params[:id] )
		profile.update!(profile_params)
		render json: profile, status: :accepted
	end

	def destroy
		@profile = Profile.find_by(user_id: session[:user_id], id: params[:id] )
		@profile.destroy
		head :no_content
	end

	private

	def profile_params
		params.permit(:month, :day, :year, :phone, :allow_followers, :family_member, :user_id)
	end

end
