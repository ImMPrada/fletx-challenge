module AuthErrors
  class UserNotFound < Base
    def initialize(message = "User not found")
      super
    end
  end
end
