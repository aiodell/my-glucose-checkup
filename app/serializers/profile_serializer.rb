class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :month, :day, :year, :phone, :allow_followers, :family_member, :user_id
  belongs_to :user
end
