require 'swagger_helper'

RSpec.describe 'Companies API', type: :request do
  path '/api/v1/companies' do
    post 'Crea una nueva empresa' do
      tags 'Empresas'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint permite crear una nueva empresa. Requiere autenticación.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      parameter name: :company_params, in: :body, schema: {
        '$ref' => '#/components/schemas/company_request'
      }

      response '200', 'empresa creada' do
        schema '$ref' => '#/components/schemas/company'

        let(:user) { create(:user) }
        let(:city) { create(:city) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:company_params) do
          {
            company: {
              name: 'FLETX Inc.',
              category: 'Transporte',
              address: 'Calle Principal 123',
              phone_number: '3001234567',
              assets: 100000.0,
              liabilities: 50000.0,
              city_id: city.id
            }
          }
        end

        run_test!
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:company_params) do
          {
            company: {
              name: 'FLETX Inc.',
              category: 'Transporte',
              address: 'Calle Principal 123',
              phone_number: '3001234567',
              assets: 100000.0,
              liabilities: 50000.0,
              city_id: 1
            }
          }
        end

        run_test!
      end

      response '404', 'ciudad no encontrada' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando la ciudad especificada no existe.'

        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:company_params) do
          {
            company: {
              name: 'FLETX Inc.',
              category: 'Transporte',
              address: 'Calle Principal 123',
              phone_number: '3001234567',
              assets: 100000.0,
              liabilities: 50000.0,
              city_id: 999  # ID de ciudad que no existe
            }
          }
        end

        run_test!
      end

      response '422', 'entidad no procesable' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando los datos proporcionados no son válidos para crear una empresa.'

        let(:user) { create(:user) }
        let(:city) { create(:city) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:company_params) do
          {
            company: {
              name: '',  # Nombre vacío para provocar error de validación
              category: 'Transporte',
              address: 'Calle Principal 123',
              phone_number: '3001234567',
              assets: 100000.0,
              liabilities: 50000.0,
              city_id: city.id  # Usamos una ciudad válida
            }
          }
        end

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
