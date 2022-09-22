class User < ApplicationRecord
  has_many :bgls
  after_create :send_welcome_email

  def send_welcome_email
    UserMailer.welcome_email(self).deliver_now  
  end
end
