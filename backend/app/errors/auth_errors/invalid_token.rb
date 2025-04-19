module AuthErrors
  class InvalidToken < Base
    def initialize(message = "Invalid token")
      super
    end
  end
end
