source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.4"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4"

# Use sqlite3 as the database for Active Record
gem "sqlite3", "~> 1.4"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# bcrypt
gem 'bcrypt', '~> 3.1.7'

#faker
gem 'faker'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem "rack-cors"
gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
 # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
 gem 'listen', '~> 3.3'
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  gem "spring"
end

gem "active_model_serializers", "~> 0.10.13"

# development mode to prevent emails from being sent out
gem 'letter_opener', group: :development

gem 'devise'