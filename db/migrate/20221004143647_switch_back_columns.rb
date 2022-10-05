class SwitchBackColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :profiles, :has_profile
    add_column :users, :has_profile, :boolean
  end
end
