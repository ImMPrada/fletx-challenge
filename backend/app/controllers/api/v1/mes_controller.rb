module Api
  module V1
    class MesController < BaseController
      before_action :authenticate_user!

      def index
        render json: {
          id: current_user.id,
          email: current_user.email,
          created_at: current_user.created_at
        }, status: :ok
      end
    end
  end
end
