class Api::ProblemsController < ApplicationController

    def get_math_problems
        @math_problems = Problem.all.select { |problem| problem.category === "math" }
        render json: {
            problems: @math_problems
        }
    end

    def get_letters_problems
        @letters_problems = Problem.all.select { |problem| problem.category === "letters" }
        render json: {
            problems: @letters_problems
        }
    end

end
