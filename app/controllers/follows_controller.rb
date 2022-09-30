class FollowsController < ApplicationController

	def create
		follow = Follow.create!(follow_params)
		render json: follow, status: created
	end

	def destroy
		follow = Follow.find_by!({follower_id: session[:user_id], followee_id: params[:id]})
		follow.destroy
		head :no_content
	end

	private

	def follow_params
		params.permit(:id, :followee_id, :follower_id)
	end
end
