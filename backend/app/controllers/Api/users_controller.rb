class Api::UsersController < ApplicationController

    def create
        @user = User.create(email: params[:user][:email], first_name: params[:user][:first_name], password: params[:user][:password])
        token = JWT.encode({user_id: @user.id}, "t3sts3cr3t")
        render json: {
            token: token
        }
    end

    def update
        @user = User.find_by(id: params[:id])

        case params[:type]
        when "math_mistake"
            @user.increase_mistakes("math")
        when "math_score"
            @user.increase_scores("math")
        end
        render json: @user
    end

end