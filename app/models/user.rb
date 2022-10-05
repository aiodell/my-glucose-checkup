class User < ApplicationRecord
  has_secure_password
  has_many :bgls, dependent: :destroy
  has_one :profile, dependent: :destroy
 
    # validate all the information during account creation
  validates :username, :email, presence: true, uniqueness: true
  validates :first_name, :last_name, presence: true
  # validates :password, presence: true, length: {minimum: 8} , only: :create
  validates_presence_of :password_confirmation, if: -> { password.present? }
  validates_confirmation_of :password, if: -> { password.present? }
 
  # followers and followees relation to Users
  has_many :followed_users, foreign_key: :followed_id, class_name: 'Follow'
  has_many :followees, through: :followed_users
  has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
  has_many :followers, through: :following_users

  # send the welcome meail after the user is created
  after_create :send_welcome_email

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_later 
  end

end
