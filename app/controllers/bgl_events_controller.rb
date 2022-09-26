class BglEventsController < ApplicationController

	def show
		bgl_event = BglEvent.find_by(user_id: session[:user_id], id: params[:id])
		render json: bgl_event, status: :ok
	end

	def update
		bgl_event = find_event
		bgl_event.update!(bgl_event_params)
		render json: bgl_event, status: :accepted
	end

	private

	def bgl_event_params
		params.permit(:bgl_id, :event_id)
	end

	def find_event
		BglEvent.find(params[:id])
	end




end
