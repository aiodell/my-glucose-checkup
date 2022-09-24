class BglsController < ApplicationController

	def index
		bgls = Bgl.where( user_id: session[:user_id] )
    	render json: bgls, status: :ok
	end

	def show
    	bgl = Bgl.find_by( user_id: session[:user_id], id: params[:id] )
    	render json: bgl, status: :ok
  	end

	def create
		user = @current_user
		@bgl = user.bgls.create!(bgl_params)
		render json: @bgl, status: :created
	end

	private

	def bgl_params
		params.permit(:value)
	end

end
