RSpec.configure do |config|
  config.include TestHelpers::Auth, type: :request
  config.include TestHelpers::Auth, type: :model
  config.include TestHelpers::Auth, type: :service
end
