class RenameFollowColumns < ActiveRecord::Migration[7.0]
  def change
    rename_column :follows, :follower_id, :followed_id
    rename_column :follows, :following_id, :followee_id
  end
end
