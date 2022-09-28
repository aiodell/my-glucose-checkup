class EventsController < ApplicationController

	def index
		render json: Event.all
	end

	def show
		@event = Event.find_by(user_id: session[:user_id], id: params[:id])
		render json: event, status:ok
	end

	def create
		event = Event.create!(event_params)
		render json: event, status: :created
	end

	def update
		event = find_event
		event.update(event_params)
		render json: event, status: :accepted
	end

	def destroy
		event = Event.find_by(id: params[:id] )
		event.destroy
		head :no_content
	end

	private

	def event_params
		params.permit(:category)
	end

	def find_event
		Event.find(params[:id])
	end

end
