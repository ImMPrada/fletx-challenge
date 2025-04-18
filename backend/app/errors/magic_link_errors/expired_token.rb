module MagicLinkErrors
  class ExpiredToken < Base
    def initialize(message = "Token expirado")
      super
    end
  end
end
