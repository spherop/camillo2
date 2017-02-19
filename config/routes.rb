Rails.application.routes.draw do
  resources :books
  get 'react_examples/component', to: 'react_examples#component', as: :component
  resources :next_steps
  resources :projects
  resources :goals
  resources :items
  resources :posts
  resources :creative_actions
  resources :actions
  resources :ideas
  resources :questions
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
