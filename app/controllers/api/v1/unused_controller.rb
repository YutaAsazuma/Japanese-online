# class Api::V1::UnusedController < Controller
#   respond_to :json
#   prepend_before_action :authenticate_with_warden, only: :create

#   def authenticate_with_warden
#     self.resource = warden.authenticate!(scope: :user, recall: "api/v1/sessions#failure")
#     sign_in(resource_name, resource) if resource
#   end

#   def create
#     # self.resource = warden.authenticate!(auth_options)
#     # if resource
#     #   sign_in(resource_name, resource)
#     #   render json: {
#     #     success: true,
#     #     user: resource,
#     #     admin: resource.admin?
#     #   }, status: :ok
#     email_param = params.dig(:session, :email) || params[:email]
#     password_param = params.dig(:session, :password) || params[:password]

#     user = User.find_for_authentication(email: email_param)
#     Rails.logger.debug "User's password valid? #{user.valid_password?(params[:password])}"
#     if user&.valid_password?(password_param)
#       if sign_in(:user, user)
#         render json: {
#           success: true,
#           user: user,
#           admin: user.admin?
#         }, status: :ok
#       else
#       render json: { success: false, message: "Error signing in." }, status: :unauthorized
#       end
#     else
#       render json: { success: false, message: "Invalid email or password." }, status: :unauthorized
#     end
#   end


#   # def failure
#   #   render json: { success: false, message: "Invalid email or password" }, status: :unauthorized
#   # end

#   private

#   # def auth_options
#   #   { scope: :user, recall: "api/v1/sessions#failure" }
#   # end

#   def respond_with(resource, _opts = {})
#     if resource.errors.empty?
#       render json: resource
#     else
#       render json: { message: resource.errors.full_message.first }, status: :unprocessable_entity
#     end
#   end

#   def respond_to_on_destroy
#     head :no_content
#   end
# end
