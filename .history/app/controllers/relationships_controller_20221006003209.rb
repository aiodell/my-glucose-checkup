class RelationshipsController < ApplicationController

	def index
		render json: Relationship.all, status: :ok
	end

	def show
		relationship = Relationship.find_by!({follower_id: session[:user_id], followee_id: params[:id]} )
		render json: relationship, status: :ok
	end

	# create the relationship between the two people
	def create
		relationship = Relationship.create!(relationship_params)
		render json: relationship, status: :created
	end

	# end the relationship between the two people
	def destroy
		relationship = Relationship.find_by!({follower_id: session[:user_id], followee_id: params[:id]})
		copyOfDeletedRelationship = relationship
		relationship.destroy
		render copyOfDeletedRelationship
	end

	private

	def relationship_params
		params.permit(:id, :followee_id, :follower_id)
	end

end
