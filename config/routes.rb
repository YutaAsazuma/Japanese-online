Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

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
      resources :products, only: %i[index show new create destroy] do
        resources :favorites, only: %i[create destroy]
        member do
          get :favorite
        end
      end
      resources :favorites, only: %i[index]
    end
  end
end
