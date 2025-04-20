module Companies
  class UpdateService
    attr_reader :company

    def initialize(params, id)
      @params = params
      @id = id
    end

    def call!
      @company = Company.find(id)
      update_params!
      update_city!

      @company.save!
      @company
    end

    private

    attr_reader :params, :id

    def update_params!
      attributes = params.except(:id, :city_id)
      @company.update(attributes)
    end

    def update_city!
      return if params[:city_id].blank?

      city = City.find(params[:city_id])
      department = city.department

      @company.update(department:, city:)
    end
  end
end
