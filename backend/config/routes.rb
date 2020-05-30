Rails.application.routes.draw do
  namespace :api do 
    post "/users", to: "users#create"
    post "/login", to: "sessions#authenticate"
    post "/authorize", to: "sessions#authorize"
  end
end
