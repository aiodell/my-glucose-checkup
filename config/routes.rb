Rails.application.routes.draw do
  resources :relationships
  resources :profiles
  resources :events
  resources :bgls
  resources :bgl_events
  resources :users

  # basic routes
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/auto-login", to: "users#show"

  # follow and unfollow routes
  # know which user the follow or unfollow the user is associated with with /users/:id
  # the button will point to either the unfollow or follow route depending on which button was clickeds
  post "/users/:id/follow", to: "users#follow"
  post "/users/:id/unfollow", to: "users#follow"

 end
