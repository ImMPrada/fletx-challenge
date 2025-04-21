class UserPolicy < ApplicationPolicy
  def index?
    user.can?("users.list")
  end

  def create?
    user.can?("users.create")
  end

  class Scope < Scope
    def resolve
      return scope.none unless user.can?("users.list")

      scope.all
    end
  end
end
