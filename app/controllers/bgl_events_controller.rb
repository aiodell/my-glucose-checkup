class BglEventsController < ApplicationController

	def create
		bgl_event = BglEvent.create!(bgl_event_params)
		render json: bgl_event.bgl, serializer: AllBglEventsSerializer, status: :created
	end

	def destroy
		bgl_event = BglEvent.find_by(id: params[:id])
		bgl_event.destroy
		head :no_content
	end

	private

	def bgl_event_params
		params.permit(:event_id, :bgl_id)
	end
end
