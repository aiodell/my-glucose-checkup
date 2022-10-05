class DropFollows < ActiveRecord::Migration[7.0]
  def up
    drop_table :follows
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
