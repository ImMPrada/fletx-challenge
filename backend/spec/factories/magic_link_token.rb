FactoryBot.define do
  factory :magic_link_token do
    association :user, factory: :user
  end
end
