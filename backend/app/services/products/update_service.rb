module Products
  class UpdateService
    attr_reader :product

    def initialize(params)
      @params = params
      @product_id = params[:id]
    end

    def call!
      @product = Product.find(@product_id)
      @product.attributes = plain_params
      assign_company!
      product.save!

      product
    end

    private

    attr_reader :params

    def plain_params
      params.except(:company_id, :id)
    end

    def assign_company!
      product.company = Company.find(params[:company_id]) if params[:company_id].present?
    end
  end
end
