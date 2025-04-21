class InvitationLinkMailer < ApplicationMailer
  def send_link
    @user = params[:user]
    @token = params[:token].token
    @url = "#{ENV['FRONTEND_URL']}/magic-login?token=#{@token}"

    mail(to: @user.email, subject: "Fuiste invitado a Fletx challenge platform")
  end
end
