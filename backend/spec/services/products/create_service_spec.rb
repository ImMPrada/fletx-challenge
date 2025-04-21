require "rails_helper"

RSpec.describe Products::CreateService do
  subject(:service) { described_class.new(params) }

  let(:params) do
    {
      name: "Product 1",
      category: "Category 1",
      price: 100,
      company_id:
    }
  end

  describe "#call!" do
    let(:company) { create(:company) }
    let(:company_id) { company.id }

    it "creates a product" do
      expect { service.call! }.to change(Product, :count).by(1)
    end

    context "when the params are invalid" do
      before do
        params.delete(:name)
      end

      it "raises an error" do
        expect { service.call! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "when the company is not found" do
      let(:company_id) { "invalid" }

      it "raises an error" do
        expect { service.call! }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
