module Api
  module V1
    class CheckFeatureController < BaseController
      def index
        @user_can = current_user.can?(code)
      end

      private

      def code
        params[:code]
      end
    end
  end
end
