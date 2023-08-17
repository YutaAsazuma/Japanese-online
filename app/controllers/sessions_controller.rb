class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_for_authentication(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in(:user, user)
      render json:{success: true, user: user}, status: :ok
    else
      render json:{success: false, message: "invalid email or password"}, status: :unauthorized
    end
  end

  private

  def respond_with(resource,opts = {})
    if resource.errors.empty?
      render json: resource
    else
      render json: { message: resource.errors.full_message.first }, status: :unprocessable_entity
    end

  end

  def respond_to_on_destroy
    head :no_content
  end
end
