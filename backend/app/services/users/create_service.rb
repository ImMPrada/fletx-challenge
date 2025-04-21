module Users
  class CreateService
    attr_reader :user

    def initialize(params)
      @params = params
    end

    def call!
      build_user
      assign_role!
      assign_company!
      user.save!

      user
    end

    private

    attr_reader :params

    def build_user
      @user = User.new(plain_params)
    end

    def plain_params
      params.except(:role_id, :company_id)
    end

    def assign_role!
      role = Role.find(params[:role_id])
      user.role = role
    end

    def assign_company!
      company = Company.find(params[:company_id])
      user.company = company
    end
  end
end
