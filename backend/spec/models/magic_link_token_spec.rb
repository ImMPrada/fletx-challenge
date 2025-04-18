require 'rails_helper'

RSpec.describe MagicLinkToken, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
  end

  describe ".verify!" do
    before do
      Timecop.freeze(Time.current)
    end

    after do
      Timecop.return
    end

    context "when the token has not been expired" do
      let(:link) { create(:magic_link_token) }

      it "returns the token" do
        expect(described_class.verify!(link.token)).to eq(link)
      end

      it "marks the token as used" do
        described_class.verify!(link.token)
        expect(link.reload.used).to be(true)
      end
    end

    context "when the token has been expired" do
      let(:expired_link) do
        Timecop.freeze(described_class::DEFAULT_EXPIRATION_TIME.ago) do
          create(:magic_link_token)
        end
      end

      it "raises ExpiredToken error when the token is invalid" do
        expect { described_class.verify!(expired_link.token) }.to raise_error(MagicLinkErrors::ExpiredToken)
      end
    end
  end

  describe "#usable?" do
    let(:link) { create(:magic_link_token) }

    it "returns true if the token is valid" do
      expect(link.usable?).to be(true)
    end

    context "when the token has been used" do
      before do
        link.update!(used: true)
      end

      it "returns false" do
        expect(link.usable?).to be(false)
      end
    end

    context "when the token has been expired" do
      before do
        link.update!(expires_at: 1.day.ago)
      end

      it "returns false" do
        expect(link.usable?).to be(false)
      end
    end
  end
end
