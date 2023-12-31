# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  def create
    user = User.find_by(email: params[:email])

    if user && user.valid_password?(params[:password])
      jwt_token = generate_jwt_for(user)
      cookies.signed[:jwt] = {
        value: jwt_token,
        httponly: true,
        secure: Rails.env.production?,
        samesite: 'strict',
        domain: 'https://localhost:3000'
      }
      render json: {
        user: {
          id: user.id,
          email: user.email,
          admin: user.admin,
          created_at: user.created_at,
          updated_at: user.updated_at,
          jti: user.jti
        },
        token: jwt_token
      }, status: :ok
    else
      render json: { error: 'Invalid credentials"' }, status: :unauthorized
    end
  end

  private

  def generate_jwt_for(user)
    Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
  end

  def respond_with(current_user, _opts = {})
    jwt_token = generate_jwt_for(current_user)

    cookies[:token] = {
      value: jwt_token,
      httponly: true,
      secure: Rails.env.production?,
      same_site: :strict,
      expires: 3.hour.from_now.exp
    }

    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        data: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
      current_user = User.find(jwt_payload['sub'])
    end

    cookies.delete(:jwt)

    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
