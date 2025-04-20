FactoryBot.define do
  factory :company do
    name { Faker::Company.name }
    category { Faker::Company.industry }
    address { Faker::Address.street_address }
    phone_number { Faker::PhoneNumber.cell_phone }
    assets { Faker::Number.decimal(l_digits: 5, r_digits: 2) }
    liabilities { Faker::Number.decimal(l_digits: 5, r_digits: 2) }

    association :department
    association :city
  end
end
