module Products
  class CreateService
    attr_reader :product

    def initialize(params)
      @params = params
    end

    def call!
      @product = Product.new(plain_params)
      assign_company!
      product.save!

      product
    end

    private

    attr_reader :params

    def plain_params
      params.except(:company_id)
    end

    def assign_company!
      product.company = Company.find(params[:company_id])
    end
  end
end
