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

    # Asegura que las features existan y asigna las features al usuario
    def user_can!(user, *feature_codes)
      raise ArgumentError, "user is required" if user.blank?

      # Crear las features si no existen
      feature_codes.each do |feature_code|
        Feature.find_or_create_by!(code: feature_code, description: "Feature #{feature_code}")
      end

      # Asegurar que el usuario tenga un rol
      user.role ||= ensure_role_exists("custom_role_#{SecureRandom.hex(4)}")

      # Asignar las features al rol
      user.role.features << Feature.where(code: feature_codes).where.not(id: user.role.feature_ids)
      user.save!
    end

    # Asegura que un rol específico exista
    def ensure_role_exists(role_code, description = nil)
      role = Role.find_by(code: role_code)

      unless role
        description ||= "Role #{role_code}"
        role = Role.create!(code: role_code, description: description)
      end

      role
    end

    # Asegura que el rol visitor exista (útil para MagicLinks y otros tests)
    def ensure_visitor_role_exists
      ensure_role_exists("visitor", "Basic visitor role")
    end

    # Crea un usuario con features específicas
    def create_user_with_features(*feature_codes, role_code: nil)
      role = nil

      if role_code
        role = ensure_role_exists(role_code)
      end

      user = create(:user, role: role)
      user_can!(user, *feature_codes) if feature_codes.any?

      user
    end
  end
end
