class ChangeProfileToProfilesSection < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :has_profile
    add_column :profiles, :has_profile, :boolean
  end
end
