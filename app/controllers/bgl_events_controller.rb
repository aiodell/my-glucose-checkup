class BglEventsController < ApplicationController

	def index
		render json: BglEvent.all.where( user_id: session[:user_id] ), status: :ok
	end

	def create
		bgl_event = BglEvent.create!(bgl_event_params)
		render json: bgl_event.bgl, serializer: AllBglEventsSerializer, status: :created
	end

	def show
		bgl_event = BglEvent.find_by(id: params[:id])
		render json: bgl_event, status: :ok
	end

	def update
		bgl_event = BglEvent.find_by(id: params[:id])
		bgl_event.update!(bgl_event_params)
		render json: updated_event, status: :accepted
	end

	private

	def bgl_event_params
		params.permit(:event_id, :bgl_id)
	end
end
