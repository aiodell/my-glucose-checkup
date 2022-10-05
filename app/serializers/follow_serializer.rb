class FollowSerializer < ActiveModel::Serializer
  attributes :id, :followed_id, :followee_id
end
