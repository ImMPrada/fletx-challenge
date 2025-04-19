module Api
  module V1
    class MeController < BaseController
      before_action :authenticate_user!

      def index
        @user = current_user
      end
    end
  end
end
