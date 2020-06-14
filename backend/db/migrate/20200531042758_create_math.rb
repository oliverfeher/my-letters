class CreateMath < ActiveRecord::Migration[6.0]
  def change
    create_table :problems do |t|
      t.string :problem
      t.integer :solution
      t.string :difficulty
      t.string :category
      t.string :url, :default => ""
    end
  end
end
