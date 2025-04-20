require "rails_helper"

RSpec.describe Companies::CreateService do
  subject { described_class.new(params) }

  let(:params) do
    {
      name: Faker::Company.name,
      category: Faker::Company.industry,
      address: Faker::Address.street_address,
      phone_number: Faker::PhoneNumber.cell_phone,
      assets: Faker::Number.decimal(l_digits: 5, r_digits: 2),
      liabilities: Faker::Number.decimal(l_digits: 5, r_digits: 2),
      city_id:
    }
  end

  describe "#call!" do
    let(:department) { create(:department) }
    let(:city) { create(:city, department: department) }
    let(:city_id) { city.id }

    it "creates a company" do
      expect { subject.call! }.to change(Company, :count).by(1)
    end

    it "returns the company" do
      expect(subject.call!).to be_a(Company)
    end

    context "when the city is not found" do
      let(:city_id) { "not-a-city-id" }

      it "raises an error" do
        expect { subject.call! }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "when a required field is missing" do
      before do
        params.delete(:name)
      end

      it "raises an error" do
        expect { subject.call! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
