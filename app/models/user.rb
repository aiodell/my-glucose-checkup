class User < ApplicationRecord
  has_secure_password
  has_many :bgls, dependent: :destroy
  has_one :profile, dependent: :destroy
 
  # followers and followees relation to Users
  has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
  has_many :followees, through: :followed_users, :dependent => :delete_all
  has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
  has_many :followers, through: :following_users, :dependent => :delete_all

  # validate all the information during account creation
  validates :username, :email, presence: true, uniqueness: true, on: :create
  validates :first_name, :last_name, presence: true, on: :create
  validates :password, presence: true, length: {minimum: 8}, on: :create

  # send the welcome meail after the user is created
  after_create :send_welcome_email

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_later 
  end

end
