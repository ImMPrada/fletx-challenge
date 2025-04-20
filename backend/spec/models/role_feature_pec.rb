require 'rails_helper'

RSpec.describe RoleFeature, type: :model do
  describe 'associations' do
    it { should belong_to(:role) }
    it { should belong_to(:feature) }
  end
end
