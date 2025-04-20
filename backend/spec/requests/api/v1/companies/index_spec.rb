require 'swagger_helper'

RSpec.describe 'Companies API', type: :request do
  path '/api/v1/companies' do
    get 'Obtiene listado de empresas' do
      tags 'Empresas'
      produces 'application/json'
      description 'Este endpoint devuelve el listado de todas las empresas registradas. Requiere autenticación y permisos adecuados.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      response '200', 'listado de empresas' do
        schema type: :array, items: { '$ref' => '#/components/schemas/company' }

        let(:user) { create_user_with_features("companies.list", role_code: "admin") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let!(:city1) { create(:city) }
        let!(:city2) { create(:city) }
        let!(:company1) { create(:company, name: 'FLETX Inc.', city: city1) }
        let!(:company2) { create(:company, name: 'Logística Express', city: city2) }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to be_an(Array)
          expect(data.length).to be >= 2
          expect(data.first).to include('id', 'name', 'category', 'address', 'phone_number', 'assets', 'liabilities')
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        run_test!
      end
    end
  end

  def generate_jwt_token_for(user)
    payload = { sub: user.id }
    secret = ENV['JWT_SECRET_KEY'] || Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret, 'HS256')
  end
end
