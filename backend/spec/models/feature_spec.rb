require 'rails_helper'

RSpec.describe Feature, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:code) }
    it { should validate_presence_of(:description) }
  end
end
