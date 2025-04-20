FactoryBot.define do
  factory :role_feature do
    role { create(:role) }
    feature { create(:feature) }
  end
end
