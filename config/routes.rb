Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :posts
    root to: "users#index"
  end

  devise_for :users
  # devise_for :users
  resources :posts do
  end
  # resources :elements do
  # end

  root "posts#index"

  get '/about', to: 'pages#about'

end
