RSpec.configure do |config|
  config.include TestHelpers::Auth, type: :request
end
