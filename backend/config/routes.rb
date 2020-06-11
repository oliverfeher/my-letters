Rails.application.routes.draw do
  namespace :api do 
    post "/users", to: "users#create"
    post "/users/authorize", to: "sessions#authorize"
    post "/login", to: "sessions#authenticate"
    patch "/users/:id", to: "users#update"
  end
end
