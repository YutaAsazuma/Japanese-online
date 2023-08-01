Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :types, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
    member do
      get :show_products
    end
  end

  resources :products
  resources :favorites
end
