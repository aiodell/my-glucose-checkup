class Bgl < ApplicationRecord
  belongs_to :user
  has_many :bgl_events, dependent: :destroy
  has_many :events, through: :bgl_events
 
 validates :value, presence: true
end
