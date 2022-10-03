class BglsController < ApplicationController

	def index
		@bgls = Bgl.where( user_id: session[:user_id] )
    	render json: @bgls, each_serializer: AllBglEventsSerializer, status: :ok
	end

	def show
    	@bgl = Bgl.find_by(user_id: session[:user_id], id: params[:id] )
    	render json: @bgl, serializer: AllBglEventsSerializer, status: :ok
  	end

	def create
		user = @current_user
		@bgl = user.bgls.create!(bgl_params)
		render json: @bgl, status: :created
	end
	
	def update
		bgl =  Bgl.find_by(user_id: session[:user_id], id: params[:id] )
		bgl.update!(bgl_params)
		render json: bgl, status: :accepted
	end

	def destroy
		@bgl = Bgl.find_by(user_id: session[:user_id], id: params[:id] )
		@bgl.destroy
		head :no_content
	end

	private

	def bgl_params
		params.permit(:value, :user_id)
	end

end
