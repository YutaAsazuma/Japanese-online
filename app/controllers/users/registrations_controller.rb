# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  include RackSessionsFix
  respond_to :json

  def create
    user = User.new(user_params)
    if user.save
      sign_in(user)
      self.resource = user
      respond_with user
    else
      render json: { status: { message: user.errors.full_messages.to_sentence }}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:registration).permit(:name, :email, :password)
  end

  def respond_with(current_user, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end
end
