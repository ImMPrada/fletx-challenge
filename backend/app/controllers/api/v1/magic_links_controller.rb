module Api
  module V1
    class MagicLinksController < BaseController
      def create
        service = MagicLinks::CreateService.new(email)
        token = service.call!

        MagicLinkMailer.with(user: service.user, token:).send_link.deliver_later
        @email = email
        render :create
      end

      private

      def email
        @email ||= params.require(:email)
      end
    end
  end
end
