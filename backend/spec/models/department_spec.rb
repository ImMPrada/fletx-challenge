require "rails_helper"

RSpec.describe Department, type: :model do
  subject { build(:department) }

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end

  describe "associations" do
    it { is_expected.to have_many(:cities).dependent(:destroy) }
    it { is_expected.to have_many(:companies).dependent(:nullify) }
  end
end
