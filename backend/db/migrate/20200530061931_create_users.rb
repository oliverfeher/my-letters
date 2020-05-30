class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.integer :math_score, :default => 0
      t.integer :words_score, :default => 0
      t.integer :letters_score, :default => 0
      t.integer :letters_mistakes, :default => 0
      t.integer :words_mistakes, :default => 0
      t.integer :math_mistakes, :default => 0
    end
  end
end
