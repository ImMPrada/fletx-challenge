require 'swagger_helper'

RSpec.describe 'Users API', type: :request do
  path '/api/v1/users' do
    get 'Obtiene listado de usuarios' do
      tags 'Usuarios'
      produces 'application/json'
      description 'Este endpoint devuelve el listado de todos los usuarios registrados. Requiere autenticación y permisos adecuados.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      response '200', 'listado de usuarios' do
        schema '$ref' => '#/components/schemas/users_response'

        let(:user) { create_user_with_features("users.list", role_code: "admin") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:role) { user.role }
        let!(:company) { create(:company, name: 'FLETX Inc.') }
        let!(:user1) { create(:user, email: 'user1@example.com', role: role, company: company) }
        let!(:user2) { create(:user, email: 'user2@example.com', role: role, company: company) }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to be_an(Array)
          expect(data.length).to be >= 2
          expect(data.first).to include('id', 'email', 'role')
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario no tiene los permisos necesarios para listar usuarios.'

        let(:user) { create(:user) } # Usuario sin permisos específicos
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }

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
