class ProductPolicy < ApplicationPolicy
  def index?
    user.can?("products.list")
  end

  def create?
    user.can?("products.create")
  end

  def update?
    user.can?("products.update")
  end

  def show?
    user.can?("products.read")
  end

  def destroy?
    user.can?("products.delete")
  end

  class Scope < Scope
    def resolve
      return scope.none unless user.can?("products.list")

      scope.all
    end
  end
end
