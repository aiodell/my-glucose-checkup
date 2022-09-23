class RemoveColumnsFromBglEvents < ActiveRecord::Migration[7.0]
  def change
    remove_column :bgl_events, :is_high
    remove_column :bgl_events, :is_low
    remove_column :bgl_events, :is_in_range
  end
end
