class User < ApplicationRecord
    has_secure_password

    # Validations
    validates :email, uniqueness: true, presence: true
    validates :password_digest, presence: true

end