require "rails_helper"

RSpec.describe Company, type: :model do
  subject { build(:company) }

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:category) }
    it { is_expected.to validate_presence_of(:address) }
    it { is_expected.to validate_presence_of(:phone_number) }
    it { is_expected.to validate_presence_of(:assets) }
    it { is_expected.to validate_presence_of(:liabilities) }
  end

  describe "associations" do
    it { is_expected.to belong_to(:department) }
    it { is_expected.to belong_to(:city) }
    it { is_expected.to have_many(:users).dependent(:nullify) }
    it { is_expected.to have_many(:products).dependent(:destroy) }
  end
end
