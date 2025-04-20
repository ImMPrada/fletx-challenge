FactoryBot.define do
  factory :feature do
    code { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end
end
