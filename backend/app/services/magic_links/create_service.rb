module MagicLinks
  class CreateService
    def initialize(email)
      @email = email
    end

    def call!
      user
      user.magic_link_tokens.create!
    end

    def user
      @user ||= User.find_or_create_by!(email:)
    end

    private

    attr_reader :email
  end
end
