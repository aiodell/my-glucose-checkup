class User < ApplicationRecord
  has_secure_password
  has_many :bgls
  after_create :send_welcome_email

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_later 
  end

  validates :username, :email, presence: true, uniqueness: true
  validates :password, presence: true, length: {minimum: 8}
end
