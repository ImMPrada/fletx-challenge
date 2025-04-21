module Api
  module V1
    class UsersController < BaseController
      def index
        @users = User.all
        authorize @users
      end

      def create
        authorize User

        service = Users::CreateService.new(user_params)
        @user = service.call!
        deliver_invitation!
      end

      private

      def user_params
        params.require(:user).permit(
          :name,
          :last_name,
          :email,
          :role_id,
          :company_id,
          :work_position,
          :phone_number,
          :salary
        )
      end

      def deliver_invitation!
        service = MagicLinks::CreateService.new(@user.email)
        token = service.call!
        InvitationLinkMailer.with(user: @user, token:).send_link.deliver_later
      end
    end
  end
end
