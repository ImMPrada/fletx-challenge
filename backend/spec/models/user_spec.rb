require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:magic_link_tokens).dependent(:destroy) }
    it { should belong_to(:role) }
  end

  describe '#can?' do
    let(:features) { create_list(:feature, 3) }
    let(:role) { create(:role, features: features) }
    let(:user) { create(:user, role: role) }

    it 'returns true if the user has the feature' do
      expect(user.can?(features.first.code)).to be_truthy
    end

    context 'when the user does not have the feature' do
      it 'returns false' do
        expect(user.can?(Faker::Lorem.word)).to be_falsey
      end
    end
  end
end
