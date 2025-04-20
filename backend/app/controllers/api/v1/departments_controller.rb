module Api
  module V1
    class DepartmentsController < BaseController
      skip_before_action :authenticate_user!

      def index
        @departments = Department.all.includes(:cities).order(:name)
      end
    end
  end
end
