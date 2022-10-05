class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :password_digest, :admin, :has_profile
  has_one :profile
  has_many :following_users
  has_many :followees
end
