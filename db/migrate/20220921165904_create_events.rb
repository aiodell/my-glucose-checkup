class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :comment
      t.string :category
      t.string :range
      t.boolean :isHigh
      t.boolean :isLow
      t.boolean :isInRange
    end
  end
end
