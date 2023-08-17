# Load the Rails application.
puts "Loading environment file..."
puts "Rack Protection loaded!" if defined?(Rack::Protection)

require_relative "application"
require 'bundler/setup'

Bundler.require(:default, Rails.env)


# Initialize the Rails application.
Rails.application.initialize!
