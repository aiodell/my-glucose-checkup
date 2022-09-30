class User < ApplicationRecord
  has_secure_password
  has_many :bgls
 
  # followers and followees relation to Users
  has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
  has_many :followees, through: :followed_users, :dependent => :delete_all
  has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
  has_many :followers, through: :following_users, :dependent => :delete_all

  after_create :send_welcome_email

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_later 
  end

  validates :username, :email, presence: true, uniqueness: true
  validates :password, presence: true, length: {minimum: 8}
end
