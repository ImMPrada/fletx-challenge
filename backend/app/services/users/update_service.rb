module Users
  class UpdateService
    attr_reader :user

    def initialize(params, id)
      @params = params
      @id = id
    end

    def call!
      @user = User.find(id)
      update_params!
      update_role!
      update_company!

      @user.save!
      @user
    end

    private

    attr_reader :params, :id

    def update_params!
      attributes = params.except(:role_id, :company_id)
      @user.update(attributes)
    end

    def update_role!
      return if params[:role_id].blank?

      role = Role.find(params[:role_id])
      @user.role = role
    end

    def update_company!
      return if params[:company_id].blank?

      company = Company.find(params[:company_id])
      @user.company = company
    end
  end
end
