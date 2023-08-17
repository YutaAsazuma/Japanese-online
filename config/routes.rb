Rails.application.routes.draw do
  namespace :admin do
    resources :sessions, only: [:new, :create, :destroy]
  end
  devise_for :users, controllers: { sessions: 'sessions'}
  root to: 'site#index'

  get 'types', to: 'site#index'
  get 'types/:id/show_products', to: 'site#index'
  namespace :api do
    namespace :v1 do
      resources :types, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
        member do
          get :show_products
        end
      end
      resources :products, only: %i[index show]
    end
  end

end
