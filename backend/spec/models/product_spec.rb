require "rails_helper"

RSpec.describe Product, type: :model do
  subject { build(:product) }

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:category) }
    it { is_expected.to validate_presence_of(:price) }
  end

  describe "associations" do
    it { is_expected.to belong_to(:company) }
  end
end
