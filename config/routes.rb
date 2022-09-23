Rails.application.routes.draw do
  resources :events
  resources :bgls
  
  # basic routes
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/auto-login", to: "users#show"
 
end
