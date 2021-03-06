# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_31_042758) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "problems", force: :cascade do |t|
    t.string "problem"
    t.integer "solution", default: 0
    t.string "category"
    t.string "url", default: ""
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.integer "math_score", default: 0
    t.integer "words_score", default: 0
    t.integer "letters_score", default: 0
    t.integer "letters_mistakes", default: 0
    t.integer "words_mistakes", default: 0
    t.integer "math_mistakes", default: 0
  end

end
