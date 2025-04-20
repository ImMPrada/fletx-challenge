require 'rails_helper'

RSpec.describe Role, type: :model do
  subject { build(:role) }

  describe 'validations' do
    it { should validate_presence_of(:code) }
    it { should validate_presence_of(:description) }
  end

  describe 'associations' do
    it { should have_many(:role_features).dependent(:destroy) }
    it { should have_many(:features).through(:role_features) }
  end
end
