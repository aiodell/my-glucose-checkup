class FollowsController < ApplicationController

	def index
		render json: Follow.all
	end

	def create
		follow = Follow.create!(follow_params)
		render json: follow, status: :created
	end

	def destroy
		follow = Follow.find_by!({followee_id: session[:user_id], followed_id: params[:id]})
		follow.destroy
		head :no_content
	end

	private

	def follow_params
		params.permit(:id, :followee_id, :followed_id)
	end
end
