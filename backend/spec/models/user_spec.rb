require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:magic_link_tokens).dependent(:destroy) }
    it { should belong_to(:role) }
  end

  describe '#can?' do
    let(:feature1) { create(:feature, code: "feature_test_1") }
    let(:feature2) { create(:feature, code: "feature_test_2") }
    let(:feature3) { create(:feature, code: "feature_test_3") }
    let(:features) { [ feature1, feature2, feature3 ] }
    let(:role) { create(:role, features: features) }
    let(:user) { create(:user, role: role) }

    it 'returns true if the user has the feature' do
      expect(user.can?(feature1.code)).to be_truthy
    end

    context 'when the user does not have the feature' do
      it 'returns false' do
        expect(user.can?(Faker::Lorem.word)).to be_falsey
      end
    end
  end
end
