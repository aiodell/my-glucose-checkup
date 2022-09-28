class User < ApplicationRecord
  has_secure_password
  has_many :bgls
  after_create :send_welcome_email

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_now  
  end

  # validates :username, :email, presence: true, uniqueness: true
  # validates :first_name, :last_name, presence: true
  # validates :password, confirmation: true, uniqueness: {case_sensitive: true},  length: {minimum: 8}
  # validates :password_confirmation, presence: true
end
