Rails.application.routes.draw do
  devise_for :users
  get 'pages/home'

  post "/signup", to: "users#create"
  root "pages#home"
end
