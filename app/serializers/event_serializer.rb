class EventSerializer < ActiveModel::Serializer
  attributes :id, :comment, :category, :range
end
