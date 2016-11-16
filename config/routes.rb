Rails.application.routes.draw do
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
