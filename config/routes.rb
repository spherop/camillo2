Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :posts
    resources :tags
    root to: "users#index"
  end

  devise_for :users
  # devise_for :users
  resources :posts do
  	resources :comments
  end
  resources :tags, except: :show
  
  get 'tags/:tag', to: 'posts#index'
  
  root "posts#index"

  get '/about', to: 'pages#about'

end
