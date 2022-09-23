class BglSerializer < ActiveModel::Serializer
  attributes :value, :created_at
  has_one :user

  def created_at
    object.created_at.strftime("%a, %d %b %Y at %I:%M:%S")
  end


end
