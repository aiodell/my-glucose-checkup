class CreateBglEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :bgl_events do |t|
      t.boolean :is_high
      t.boolean :is_low
      t.boolean :is_in_range
      t.belongs_to :bgl, null: false, foreign_key: true
      t.belongs_to :event, null: false, foreign_key: true
    end
  end
end
