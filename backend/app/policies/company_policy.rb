class CompanyPolicy < ApplicationPolicy
  def create?
    user.can?("companies.create")
  end

  class Scope < Scope
    def resolve
      return scope.none unless user.can?("companies.list")

      scope.all
    end
  end
end
