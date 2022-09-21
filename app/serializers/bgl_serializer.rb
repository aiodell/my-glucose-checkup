class BglSerializer < ActiveModel::Serializer
  attributes :value, :timestamps
  has_one :user

end
