module Api
  module V1
    class UsersController < BaseController
      def index
        @users = User.all
        authorize @users
      end
    end
  end
end
