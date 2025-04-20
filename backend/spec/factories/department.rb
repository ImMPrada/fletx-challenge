FactoryBot.define do
  factory :department do
    sequence(:name) { |n| "#{Faker::Address.state} #{n}" }
  end
end
