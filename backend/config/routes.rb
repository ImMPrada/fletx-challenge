Rails.application.routes.draw do
  devise_for :users
  mount Rswag::Ui::Engine => "api/v1/docs"
  mount Rswag::Api::Engine => "swagger"

  namespace :api do
    namespace :v1 do
      resources :magic_links, only: [ :create ]
      resources :magic_auths, only: [ :create ]
      resources :me, only: [ :index ]
      resources :departments, only: [ :index ]
      resources :companies, only: [ :index, :create, :show, :update ]
      resources :check_feature, only: [ :index ]
      delete "/logout", to: "sessions#destroy"
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
