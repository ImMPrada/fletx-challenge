require 'swagger_helper'

RSpec.describe 'Companies API', type: :request do
  path '/api/v1/companies/{id}' do
    put 'Actualiza una empresa existente' do
      tags 'Empresas'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint permite actualizar todos los campos de una empresa existente. Requiere autenticación.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      parameter name: :id, in: :path, type: :integer, description: 'ID de la empresa a actualizar', required: true
      parameter name: :company_params, in: :body, schema: {
        '$ref' => '#/components/schemas/company_request'
      }

      response '200', 'empresa actualizada correctamente' do
        schema '$ref' => '#/components/schemas/company'

        let(:user) { create_user_with_features("companies.update", role_code: "admin") }
        let(:city) { create(:city) }
        let(:company) { create(:company, city: city) }
        let(:id) { company.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:company_params) do
          {
            company: {
              name: 'FLETX Inc. Updated',
              category: 'Logística',
              address: 'Calle Secundaria 456',
              phone_number: '3007654321',
              assets: 150000.0,
              liabilities: 75000.0,
              city_id: city.id
            }
          }
        end

        run_test!
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:company) { create(:company) }
        let(:id) { company.id }
        let(:company_params) do
          {
            company: {
              name: 'FLETX Inc. Updated',
              category: 'Logística',
              address: 'Calle Secundaria 456',
              phone_number: '3007654321',
              assets: 150000.0,
              liabilities: 75000.0,
              city_id: 1
            }
          }
        end

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario autenticado no tiene permiso para actualizar empresas.'

        let(:user) { create_user_with_features(role_code: "user") } # Un rol sin el feature companies.update
        let(:city) { create(:city) }
        let(:company) { create(:company, city: city) }
        let(:id) { company.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:company_params) do
          {
            company: {
              name: 'FLETX Inc. Updated',
              category: 'Logística',
              address: 'Calle Secundaria 456',
              phone_number: '3007654321',
              assets: 150000.0,
              liabilities: 75000.0,
              city_id: city.id
            }
          }
        end

        run_test!
      end

      response '404', 'empresa o ciudad no encontrada' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando la empresa o la ciudad especificada no existe.'

        let(:user) { create_user_with_features("companies.update", role_code: "admin") }
        let(:id) { 999 } # ID de empresa que no existe
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:company_params) do
          {
            company: {
              name: 'FLETX Inc. Updated',
              category: 'Logística',
              address: 'Calle Secundaria 456',
              phone_number: '3007654321',
              assets: 150000.0,
              liabilities: 75000.0,
              city_id: 1
            }
          }
        end

        run_test!
      end

      response '422', 'entidad no procesable' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando los datos proporcionados no son válidos para actualizar la empresa.'

        let(:user) { create_user_with_features("companies.update", role_code: "admin") }
        let(:city) { create(:city) }
        let(:company) { create(:company, city: city) }
        let(:id) { company.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:company_params) do
          {
            company: {
              name: '',  # Nombre vacío para provocar error de validación
              category: 'Logística',
              address: 'Calle Secundaria 456',
              phone_number: '3007654321',
              assets: 150000.0,
              liabilities: 75000.0,
              city_id: city.id
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
