module Authorizable
  extend ActiveSupport::Concern
  include Pundit::Authorization

  included do
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  end

  private

  def user_not_authorized
    render json: { message: "Not authorized" }, status: :forbidden
  end

  # This is a hack to be able to pass the params and request objects to the policies and policy scopes.
  # Originally this method should resolve the current user so it can be passed to the policy class that would be used
  # and its scope. Instead, we pass the current context object which contains the user, params and request.
  # The ApplicationPolicy class will receive the context and extract each attribute to be used in the policy
  # and its scope.
  # This will allow us to use the params and the request in the authorization logic as needed.
  def pundit_user
    CurrentContext.new(
      user: current_user,
      params:,
      request:
    )
  end
end
