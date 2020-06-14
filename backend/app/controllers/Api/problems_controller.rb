class Api::ProblemsController < ApplicationController

    def get_math_problems
        @math_problems = Problem.all.select { |problem| problem.category === "math" }
        render json: {
            problems: @math_problems
        }
    end

end
