class User < ApplicationRecord
    has_secure_password

    # Validations
    validates :email, uniqueness: true, presence: true
    validates :password_digest, presence: true

    def increase_scores(type)
        case type
        when "words"
            self.words_score += 1
        when "letters"
            self.letters_score += 1
        when "math"
            self.math_score += 1
        end
        self.save
    end

    def increase_mistakes(type)
        case type
        when "words"
            self.words_mistakes += 1
        when "letters"
            self.letters_mistakes += 1
        when "math"
            self.math_mistakes += 1
        end
        self.save
    end
end