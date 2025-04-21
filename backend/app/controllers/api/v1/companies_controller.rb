module Api
  module V1
    class CompaniesController < BaseController
      def index
        @companies = Company.includes(:city, :department).order(created_at: :desc)
        authorize @companies
      end

      def show
        @company = Company.find(params[:id])
        authorize @company
      end

      def create
        authorize Company

        service = Companies::CreateService.new(company_params)
        @company = service.call!
      end

      def update
        authorize Company

        service = Companies::UpdateService.new(company_params, params[:id])
        @company = service.call!
      end

      def destroy
        @company = Company.find(params[:id])
        authorize @company

        @company.destroy
      end

      private

      def company_params
        params.require(:company).permit(:name, :category, :address, :phone_number, :assets, :liabilities, :city_id)
      end
    end
  end
end
