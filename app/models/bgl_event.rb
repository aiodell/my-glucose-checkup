class BglEvent < ApplicationRecord
  belongs_to :bgl
  belongs_to :event
  after_create :calculate_range

  def calculate_range
    if self.bgl.value < 80
      self.update(is_low: true)
    elsif self.bgl.value > 120
      self.update(is_high: true)
    else 
      self.update(is_in_range: true)
    end
  end

end
