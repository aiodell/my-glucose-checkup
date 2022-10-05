Rails.application.routes.draw do
  resources :profiles
  resources :events
  resources :bgls
  resources :bgl_events
  resources :users
  resources :follows

  # basic routes
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/auto-login", to: "users#show"

 end
