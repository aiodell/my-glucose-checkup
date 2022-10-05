class Follow < ApplicationRecord
 	belongs_to :followed, class_name: 'User'
    belongs_to :followee, class_name: 'User'
end
