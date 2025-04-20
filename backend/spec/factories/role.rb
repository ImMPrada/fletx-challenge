FactoryBot.define do
  factory :role do
    code { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end
end
