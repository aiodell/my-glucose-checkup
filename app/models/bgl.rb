class Bgl < ApplicationRecord
  belongs_to :user
  has_many :bgl_events
  has_many :events, through: :bgl_events
  
end
