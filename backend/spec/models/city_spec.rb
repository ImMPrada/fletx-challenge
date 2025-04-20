require "rails_helper"

RSpec.describe City, type: :model do
  subject { build(:city) }

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:department_id) }
  end

  describe "associations" do
    it { is_expected.to belong_to(:department) }
    it { is_expected.to have_many(:companies).dependent(:nullify) }
  end
end
