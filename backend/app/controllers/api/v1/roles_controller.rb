module Api
  module V1
    class RolesController < BaseController
      skip_before_action :authenticate_user!, only: [ :index ]

      def index
        @roles = Role.all
      end
    end
  end
end
