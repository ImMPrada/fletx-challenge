class CurrentContext
  attr_reader :user, :params, :request

  def initialize(user:, params:, request:)
    @user = user
    @params = params
    @request = request
  end
end
