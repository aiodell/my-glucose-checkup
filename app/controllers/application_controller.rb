class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_user

  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  private

  # error handling
  def render_invalid(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_not_found(not_found)
    render json: {error: "#{not_found.model} not found"}, status: :not_found
  end

  # user authentication
  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  def authenticate_user
    render json: {errors: {User: "Not Authorized"}}, status: :unauthorized unless current_user
  end

  # admin privledges
  def is_authorized? 
      permitted = current_user.admin? # going true or false based on teh admin attribute of our current user 
      render json: {errors: {User: "does not have admin permission"}}, status: :forbidden unless permitted
  end
end
