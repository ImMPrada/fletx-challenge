module TestHelpers
  module Auth
    def act_as!(user)
      raise ArgumentError, "user is required" if user.blank?

      application = create(:oauth_application)
      token = create(:doorkeeper_access_token, application: application, resource_owner_id: user.id)

      @auth_token = token.token
    end

    def auth_headers
      @auth_token ? { "Authorization" => "Bearer #{@auth_token}" } : {}
    end

    def user_can!(user, *feature_codes)
      feature_codes.each do |feature_code|
        UsersEngine::Feature.find_or_create_by!(code: feature_code, description: feature_code)
      end

      user.role ||= create(:role)
      user.role.features << UsersEngine::Feature.where(code: feature_codes)
      user.save!
    end
  end
end
