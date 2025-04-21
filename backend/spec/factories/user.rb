FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    last_name { Faker::Name.last_name }
    work_position { Faker::Job.title }
    phone_number { Faker::PhoneNumber.cell_phone }
    salary { Faker::Number.decimal(l_digits: 5, r_digits: 2) }
    email { Faker::Internet.email }
    association :company
    association :role
  end
end
