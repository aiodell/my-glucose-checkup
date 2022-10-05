class AddHasProfileToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :has_profile, :boolean
  end
end
