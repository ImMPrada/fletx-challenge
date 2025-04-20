class ApplicationPolicy
  attr_reader :user, :params, :request, :record

  def initialize(context, record)
    @user = context.user
    @params = context.params
    @request = context.request
    @record = record
  end

  def index?
    false
  end

  def show?
    false
  end

  def create?
    false
  end

  def update?
    false
  end

  def destroy?
    false
  end

  class Scope
    def initialize(context, scope)
      @user = context.user
      @params = context.params
      @request = context.request
      @scope = scope
    end

    def resolve
      raise NoMethodError, "You must define #resolve in #{self.class}"
    end

    private

    attr_reader :user, :params, :request, :scope
  end
end
