FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    category { Faker::Lorem.sentence }
    price { Faker::Commerce.price }

    association :company
  end
end
