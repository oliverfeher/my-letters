Rails.application.routes.draw do
  namespace :api do 
    post "/users", to: "users#create"
    post "/users/authorize", to: "sessions#authorize"
    post "/login", to: "sessions#authenticate"
    patch "/users/:id", to: "users#update"
    get "/game/math-problems", to: "problems#get_math_problems"
    get "/game/letters-problems", to: "problems#get_letters_problems"
  end
end
