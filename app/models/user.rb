class User < ApplicationRecord
  has_secure_password
  has_many :bgls
  after_create :send_welcome_email

  # validates :first_name, :last_name, :email, :password, :password_confirmation, presence: true

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_now  
  end
end
