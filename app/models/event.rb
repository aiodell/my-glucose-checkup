class Event < ApplicationRecord
	has_many :bgl_events
	has_many :bgls, through: :bgl_events
end
