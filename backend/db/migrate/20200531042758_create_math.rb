class CreateMath < ActiveRecord::Migration[6.0]
  def change
    create_table :problems do |t|
      t.string :problem
      t.integer :solution
      t.string :difficulty
    end
  end
end
