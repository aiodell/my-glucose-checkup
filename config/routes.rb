Rails.application.routes.draw do
  resources :bgl_events
  resources :events
  resources :bgls
  
  # Starting pages for email
  get 'pages/home'
  root "pages#home"

  # basic routes
  post "/signup", to: "users#create"
  get "/auto-login", to: "users#show"

  get "/login", to: "sessions#create"
  delete "/logout", to "sessions#destroy"

  
end
