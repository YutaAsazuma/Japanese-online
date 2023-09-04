Rails.application.config.session_store :cookie_store, key: 'Japanese-online', httponly: true, secure: Rails.env.production?
