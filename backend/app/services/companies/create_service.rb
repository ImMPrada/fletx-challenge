module Companies
  class CreateService
    attr_reader :company

    def initialize(params)
      @params = params
    end

    def call!
      @company = Company.new(params.except(:city_id))
      assign_city!
      assign_department!
      @company.save!

      @company
    end

    private

    attr_reader :params, :city

    def assign_city!
      @city = City.find(params[:city_id])
      @company.city = @city
    end

    def assign_department!
      @department = city.department
      @company.department = @department
    end
  end
end
