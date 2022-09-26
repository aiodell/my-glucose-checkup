class EventsController < ApplicationController

	def index
		render json: Event.all
	end

	def show
		@event = Event.find_by(user_id: session[:user_id], id: params[:id])
		render json: event, status:ok
	end

	private

	def event_params
		params.permit(:category)
	end

	def find_event
		Event.find(params[:id])
	end




end
