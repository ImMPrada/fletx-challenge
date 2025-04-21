module Api
  module V1
    class ProductsController < BaseController
      def index
        @products = Product.all
        authorize @products
      end

      def create
        service = Products::CreateService.new(product_params)
        @product = service.call!
        authorize @product
      end

      def show
        @product = Product.find(params[:id])
        authorize @product
      end

      def update
        service = Products::UpdateService.new(product_params.merge(id: params[:id]))
        @product = service.call!
        authorize @product
      end

      def destroy
        @product = Product.find(params[:id])
        authorize @product

        @product.destroy
      end

      private

      def product_params
        params.require(:product).permit(:name, :category, :price, :company_id)
      end
    end
  end
end
