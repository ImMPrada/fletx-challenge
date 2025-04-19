module Api
  module V1
    class MagicAuthsController < BaseController
      TOKEN_EXPIRATION_TIME = 2.hours

      skip_before_action :authenticate_user!

      def create
        token = generate_jwt_token(user)

        render json: {
          success: true,
          token: token
        }, status: :ok
      rescue => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def generate_jwt_token(user)
        payload = {
          sub: user.id,
          exp: TOKEN_EXPIRATION_TIME.from_now.to_i
        }
        
        secret = Rails.application.credentials.secret_key_base
        JWT.encode(payload, secret, 'HS256')
      end

      def record
        @record ||= MagicLinkToken.verify!(magic_link_params[:token])
      end

      def user
        @user ||= record.user
      end

      def magic_link_params
        params.require(:magic_link).permit(:token)
      end
    end
  end
end
