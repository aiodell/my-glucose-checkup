class BglEvent < ApplicationRecord
  belongs_to :bgl
  belongs_to :event

  validates :event_id, uniqueness: true
end
