require 'rails_helper'

RSpec.describe Users::CreateService do
  subject(:service) { described_class.new(params) }

  let(:params) do
    {
      name: Faker::Name.name,
      email:,
      role_id:,
      company_id:,
      work_position: Faker::Job.title,
      phone_number: Faker::PhoneNumber.cell_phone,
      salary: Faker::Number.between(from: 1000, to: 100000)
    }
  end

  describe '#call!' do
    let(:email) { Faker::Internet.email }
    let(:role) { create(:role) }
    let(:company) { create(:company) }
    let(:role_id) { role.id }
    let(:company_id) { company.id }

    it 'creates a user' do
      expect { service.call! }.to change(User, :count).by(1)
    end

    it 'returns the user' do
      expect(service.call!).to eq(service.user)
    end

    context 'when the user is not valid' do
      before do
        create(:user, email:)
      end

      it 'throws an error' do
        expect { service.call! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when company is not valid' do
      let(:company_id) { 'not-a-valid-id' }

      it 'throws an error' do
        expect { service.call! }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when role is not valid' do
      let(:role_id) { 'not-a-valid-id' }

      it 'throws an error' do
        expect { service.call! }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
