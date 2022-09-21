class CreateBgls < ActiveRecord::Migration[7.0]
  def change
    create_table :bgls do |t|
      t.integer :value
      t.belongs_to :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
