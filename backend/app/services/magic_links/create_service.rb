module MagicLinks
  class CreateService
    BASIC_ROLE_CODE = "visitor".freeze

    def initialize(email)
      @email = email
    end

    def call!
      user
      assign_basic_role!
      user.save!

      user.magic_link_tokens.create!
    end

    def user
      @user ||= User.find_or_initialize_by(email:)
    end

    private

    attr_reader :email

    def assign_basic_role!
      return if user.role.present?

      role = Role.find_by!(code: BASIC_ROLE_CODE)
      user.role = role
    end
  end
end
