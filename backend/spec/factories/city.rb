FactoryBot.define do
  factory :city do
    sequence(:name) { |n| "#{Faker::Address.city} #{n}" }
    association :department
  end
end
