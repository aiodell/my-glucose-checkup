class BglEventSerializer < ActiveModel::Serializer
  attributes :id
  has_one :bgl
  has_one :event
end
