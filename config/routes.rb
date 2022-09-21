Rails.application.routes.draw do
  resources :users
  resources :bgl_events
  resources :events
  resources :bgls
  
  get 'pages/home'

  post "/signup", to: "users#create"
  root "pages#home"
end
