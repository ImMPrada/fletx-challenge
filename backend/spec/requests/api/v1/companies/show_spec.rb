require 'swagger_helper'

RSpec.describe 'Companies API', type: :request do
  path '/api/v1/companies/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'ID de la empresa a consultar'

    get 'Obtiene detalles de una empresa específica' do
      tags 'Empresas'
      produces 'application/json'
      description 'Devuelve la información detallada de una empresa específica por su ID. Requiere autenticación y permisos adecuados.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      response '200', 'detalle de empresa' do
        schema '$ref' => '#/components/schemas/company'

        let(:user) { create_user_with_features("companies.read", role_code: "admin") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let!(:city) { create(:city) }
        let!(:company) { create(:company, name: 'FLETX Inc.', city: city) }
        let(:id) { company.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to include('id', 'name', 'category', 'address', 'phone_number', 'assets', 'liabilities')
          expect(data['id']).to eq(company.id)
          expect(data['name']).to eq('FLETX Inc.')
          expect(data).to have_key('city')
          expect(data).to have_key('department')
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:id) { 1 }

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario no tiene los permisos necesarios para ver la empresa.'

        let(:user) { create(:user) } # Usuario sin permisos específicos
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let!(:city) { create(:city) }
        let!(:company) { create(:company, city: city) }
        let(:id) { company.id }

        run_test!
      end

      response '404', 'empresa no encontrada' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no existe una empresa con el ID proporcionado.'

        let(:user) { create_user_with_features("companies.read", role_code: "admin") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:id) { 999999 } # ID que no existe

        run_test!
      end
    end
  end

  def generate_jwt_token_for(user)
    payload = { sub: user.id }
    secret = ENV['JWT_SECRET_KEY'] || Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret, 'HS256')
  end

  def create_user_with_features(feature_codes, role_code: "user")
    feature_codes = Array(feature_codes)
    role = create(:role, code: role_code)

    features = feature_codes.map do |code|
      create(:feature, code: code)
    end

    features.each do |feature|
      create(:role_feature, role: role, feature: feature)
    end

    create(:user, role: role)
  end
end
