module Api
  module V1
    class MagicAuthsController < ApplicationController
      def create
        sign_in(user)

        sign_cookies
        head :no_content
      rescue => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def record
        @record ||= MagicLinkToken.verify!(magic_link_params[:token])
      end

      def user
        @user ||= record.user
      end

      def magic_link_params
        params.require(:magic_link).permit(:token)
      end

      def sign_cookies
        token = request.env["warden-jwt_auth.token"]

        cookies.signed[:jwt] = {
          value: token,
          httponly: true,
          secure: Rails.env.production?,
          same_site: :lax,
          expires: 2.hours.from_now
        }
      end
    end
  end
end
