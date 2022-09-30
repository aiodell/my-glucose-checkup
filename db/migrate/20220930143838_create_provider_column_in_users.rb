class CreateProviderColumnInUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :provider_column_in_users do |t|
        add_column :users, :is_provider, :boolean
      t.timestamps
    end
  end
end
