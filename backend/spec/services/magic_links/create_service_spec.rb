
require "rails_helper"

RSpec.describe MagicLinks::CreateService do
  describe "#call!" do
    context "when the email does not exist" do
      let(:email) { "test@example.com" }

      it "creates a new user" do
        expect {
          described_class.new(email).call!
        }.to change(User, :count).by(1)
      end

      it "creates a new magic link token" do
        expect {
          described_class.new(email).call!
        }.to change(MagicLinkToken, :count).by(1)
      end
    end

    context "when the email exists" do
      let(:email) { "test@example.com" }

      before do
        create(:user, email:)
      end

      it "does not create a new user" do
        expect {
          described_class.new(email).call!
        }.to change(User, :count).by(0)
      end

      it "creates a new magic link token" do
        expect {
          described_class.new(email).call!
        }.to change(MagicLinkToken, :count).by(1)
      end
    end

    context "when the email is invalid" do
      let(:email) { "invalid-email" }

      it "raises an error" do
        expect { described_class.new(email).call! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
