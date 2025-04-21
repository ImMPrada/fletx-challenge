require 'swagger_helper'

RSpec.describe 'Users API', type: :request do
  path '/api/v1/users/{id}' do
    put 'Actualiza un usuario existente' do
      tags 'Usuarios'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint permite actualizar todos los campos de un usuario existente. Requiere autenticación.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      parameter name: :id, in: :path, type: :integer, description: 'ID del usuario a actualizar', required: true
      parameter name: :user_params, in: :body, schema: {
        '$ref' => '#/components/schemas/user_request'
      }

      response '200', 'usuario actualizado correctamente' do
        schema '$ref' => '#/components/schemas/user'

        let(:user) { create_user_with_features("users.update", role_code: "admin") }
        let(:role) { create(:role) }
        let(:company) { create(:company) }
        let(:existing_user) { create(:user, role: create(:role), company: create(:company)) }
        let(:id) { existing_user.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user_params) do
          {
            user: {
              name: 'Juan Actualizado',
              last_name: 'Pérez Actualizado',
              email: 'juan.actualizado@example.com',
              role_id: role.id,
              company_id: company.id,
              work_position: 'Director de Operaciones',
              phone_number: '3007654321',
              salary: 75000.0
            }
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to include('id', 'email', 'name', 'lastName', 'role')
          expect(data['email']).to eq('juan.actualizado@example.com')
          expect(data['name']).to eq('Juan Actualizado')
          expect(data['lastName']).to eq('Pérez Actualizado')
          expect(data['workPosition']).to eq('Director de Operaciones')
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:existing_user) { create(:user) }
        let(:id) { existing_user.id }
        let(:user_params) do
          {
            user: {
              name: 'Juan Actualizado',
              last_name: 'Pérez Actualizado',
              email: 'juan.actualizado@example.com',
              role_id: 1,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario autenticado no tiene permiso para actualizar usuarios.'

        let(:user) { create_user_with_features(role_code: "user") } # Un rol sin el feature users.update
        let(:existing_user) { create(:user, role: create(:role), company: create(:company)) }
        let(:id) { existing_user.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user_params) do
          {
            user: {
              name: 'Juan Actualizado',
              last_name: 'Pérez Actualizado',
              email: 'juan.actualizado@example.com',
              role_id: 1,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '404', 'usuario, rol o empresa no encontrada' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario, rol o empresa especificada no existe.'

        let(:user) { create_user_with_features("users.update", role_code: "admin") }
        let(:id) { 999 } # ID de usuario que no existe
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user_params) do
          {
            user: {
              name: 'Juan Actualizado',
              last_name: 'Pérez Actualizado',
              email: 'juan.actualizado@example.com',
              role_id: 1,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '422', 'entidad no procesable' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando los datos proporcionados no son válidos para actualizar el usuario.'

        let(:user) { create_user_with_features("users.update", role_code: "admin") }
        let(:role) { create(:role) }
        let(:company) { create(:company) }
        let(:existing_user) { create(:user, role: create(:role), company: create(:company)) }
        let(:id) { existing_user.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user_params) do
          {
            user: {
              name: 'Juan Actualizado',
              last_name: 'Pérez Actualizado',
              email: 'email-invalido',  # Email inválido para provocar error de validación
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
