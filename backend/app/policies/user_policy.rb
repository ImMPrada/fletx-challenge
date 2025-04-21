class UserPolicy < ApplicationPolicy
  def index?
    user.can?("users.list")
  end

  class Scope < Scope
    def resolve
      return scope.none unless user.can?("users.list")

      scope.all
    end
  end
end
