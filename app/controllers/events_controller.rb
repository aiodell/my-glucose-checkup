class EventsController < ApplicationController

	def index
		render json: Event.all
	end

	def show
		event = find_event
		render json: event, status:ok
	end

	def update
		event = find_event
		event.update!(event_params)
		render json: event, status: :accepted
	end

	private

	def event_params
		params.permit(:category)
	end

	def find_event
		EVent.find(params[:id])
	end




end
