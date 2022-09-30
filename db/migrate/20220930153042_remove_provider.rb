class RemoveProvider < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :is_provider
  end
end
