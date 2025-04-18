require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:magic_link_tokens).dependent(:destroy) }
  end
end
