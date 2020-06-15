class Problem < ApplicationRecord
    validates :problem, uniqueness: true
end