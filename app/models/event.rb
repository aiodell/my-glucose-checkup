class Event < ApplicationRecord
	has_many :bgl_events, dependent: :destroy
	has_many :bgls, through: :bgl_events

	validates :category, presence: true, uniqueness: true
end
