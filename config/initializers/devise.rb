Devise.setup do |config|
  # The default sender for Devise mailers
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'

  # Using Active Record as the ORM for Devise
  require 'devise/orm/active_record'

  # Email will be treated case-insensitively during authentication
  config.case_insensitive_keys = [:email]

  # Remove whitespace from these authentication keys
  config.strip_whitespace_keys = [:email]

  # The keys used for authentication
  config.authentication_keys = [:email]

  # The formats that should be treated as navigational.
  # config.navigational_formats = ['*/*', :html, :json]
  config.navigational_formats = []

  # Devise will skip session storage for these authentication methods
  config.skip_session_storage = [:http_auth]

  # Password "stretching" factor, affects computational cost
  config.stretches = Rails.env.test? ? 1 : 12

  # Users need to reconfirm their email after changing it
  config.reconfirmable = true

  # Expire the "remember me" token on sign out
  config.expire_all_remember_me_on_sign_out = true

  # The acceptable password length
  config.password_length = 6..128

  # A basic regex used to validate email formats
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/

  # The time frame within which the reset password token is valid
  config.reset_password_within = 6.hours

  # The HTTP method used to sign out
  config.sign_out_via = :delete

  # These are custom configurations and are not standard Devise settings.
  # You might have them due to custom responders or routes.
  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :see_other

  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.devise_jwt_secret_key!
    jwt.dispatch_requests = [
      ['POST', %r{^/login$}]
    ]
    jwt.revocation_requests = [
      ['DELETE', %r{^/logout$}]
    ]
    jwt.expiration_time = 30.minutes.to_i
end

  # Uncomment this if you want to specify a custom router name for Devise routes
  # config.router_name = :api_v1
end
