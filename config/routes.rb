Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :posts
    root to: "users#index"
  end

  devise_for :users
  resources :posts
  
  resources :elements
  

  root "posts#index"

  get '/about', to: 'pages#about'
  get '/timeline', to: 'posts#timeline'

end
