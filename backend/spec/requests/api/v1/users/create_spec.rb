require 'swagger_helper'

RSpec.describe 'Users API', type: :request do
  path '/api/v1/users' do
    post 'Crea un nuevo usuario' do
      tags 'Usuarios'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint permite crear un nuevo usuario. Requiere autenticación y el permiso correspondiente.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      parameter name: :user_params, in: :body, schema: {
        '$ref' => '#/components/schemas/user_request'
      }

      response '200', 'usuario creado' do
        schema '$ref' => '#/components/schemas/user'

        let(:user) { create_user_with_features("users.create", role_code: "admin") }
        let(:role) { create(:role) }
        let(:company) { create(:company) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user_params) do
          {
            user: {
              name: 'Juan',
              last_name: 'Pérez',
              email: 'juan.perez@example.com',
              role_id: role.id,
              company_id: company.id,
              work_position: 'Gerente de Operaciones',
              phone_number: '3001234567',
              salary: 50000.0
            }
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to include('id', 'email', 'name', 'last_name', 'role')
          expect(data['email']).to eq('juan.perez@example.com')
          expect(data['name']).to eq('Juan')
          expect(data['last_name']).to eq('Pérez')
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:user_params) do
          {
            user: {
              name: 'Juan',
              last_name: 'Pérez',
              email: 'juan.perez@example.com',
              role_id: 1,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario autenticado no tiene permiso para crear usuarios.'

        let(:user) { create_user_with_features(role_code: "user") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user_params) do
          {
            user: {
              name: 'Juan',
              last_name: 'Pérez',
              email: 'juan.perez@example.com',
              role_id: 1,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '422', 'entidad no procesable' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando los datos proporcionados no son válidos.'

        let(:user) { create_user_with_features("users.create", role_code: "admin") }
        let(:role) { create(:role) }
        let(:company) { create(:company) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user_params) do
          {
            user: {
              name: 'Juan',
              last_name: 'Pérez',
              email: 'correo-invalido',  # Email inválido
              role_id: role.id,
              company_id: company.id
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
