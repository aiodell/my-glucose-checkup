class Event < ApplicationRecord
	has_many :bgl_events, dependent: :destroy
	has_many :bgls, through: :bgl_events
end
