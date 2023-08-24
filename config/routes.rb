Rails.application.routes.draw do
  # namespace :admin do
  #   resources :sessions, only: [ :new, :create, :destroy ]
  # end

  root to: 'site#index'
  mount_devise_token_auth_for 'User', at: 'auth'

  # namespace :api do
  #   namespace :v1 do
  #     devise_for :users, controllers: { sessions: 'api/v1/sessions' }
  #   end
  # end

  get 'types', to: 'site#index'
  get 'types/:id/show_products', to: 'site#index'
  namespace :api do
    namespace :v1 do
      resources :types, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
        member do
          get :show_products
        end
      end
      resources :products, only: %i[index show create]
    end
  end
end
