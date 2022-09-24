class EventsController < ApplicationController

	def index
		events = Event.where( user_id: session[:user_id] )
    	render json: events, status: :ok
	end

	def show	  
		event = Event.find_by( user_id: session[:user_id], id: params[:id] )
		render json: event, status: :ok
	end

	def create
		bgl = @bgl
		event = bgl.events.create!(event_params)
		render json: event, status: :created
	end

	def update
		event = Event.find_by( user_id: session[:user_id], id: params[:id] )
		event.update!(event_params)
		render json: event, status: :accepted
	end

	private

	def event_params
		params.permit(:category, :comment)
	end



end
