source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"
gem "devise"
gem "jquery-rails"
gem "webpacker", "~> 5.0"
gem "rails", "~> 7.0.5"
gem "sprockets-rails"
gem 'refile', require: 'refile/rails', github: 'refile/refile'
gem 'carrierwave'
gem 'mini_magick'
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem 'react-rails'
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
# gem "bootsnap", require: false
gem "sassc-rails"
gem "autoprefixer-rails"
gem 'jwt'
gem 'devise-jwt'
gem 'jsonapi-serializer'
gem 'rack-cors'

gem 'rack-protection', '2.1.0'
gem "font-awesome-sass", "~> 6.1"
gem "simple_form", github: "heartcombo/simple_form"


group :development do
  gem 'letter_opener'
end

group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem "dotenv-rails"
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
