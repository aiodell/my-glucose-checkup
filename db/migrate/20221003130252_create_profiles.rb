class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.integer :month
      t.integer :day
      t.integer :year
      t.string :phone
      t.boolean :allow_followers
      t.boolean :family_member
      t.integer :user_id

      t.timestamps
    end
  end
end
