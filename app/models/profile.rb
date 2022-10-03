class Profile < ApplicationRecord
belongs_to :user
after_create :update_has_profile

def update_has_profile
	self.user.update(has_profile: true)
end

end
