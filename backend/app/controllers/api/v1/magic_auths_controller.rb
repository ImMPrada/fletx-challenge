module Api
  module V1
    class MagicAuthsController < BaseController
      TOKEN_EXPIRATION_TIME = 2.hours

      skip_before_action :authenticate_user!

      def create
        sign_in(user)

        sign_cookies

        render json: { success: true }, status: :ok
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

        token_value = token
        expires = 2.hours.from_now

        cookie_str = "jwt=#{token_value}; path=/; expires=#{expires.httpdate}; HttpOnly;"

        response.headers["Set-Cookie"] = cookie_str
        response.headers["X-JWT-Token"] = token
        response.headers["Access-Control-Expose-Headers"] = "X-JWT-Token, Set-Cookie"
      end
    end
  end
end
