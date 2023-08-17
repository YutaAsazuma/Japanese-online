Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # Be cautious with this in a production application. You'd typically specify the actual origin you want to allow.
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
