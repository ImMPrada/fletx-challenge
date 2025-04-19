require 'swagger_helper'

RSpec.describe 'Magic Auth API', type: :request do
  path '/api/v1/magic_auths' do
    post 'Crea una sesión autenticada usando un token de Magic Link' do
      tags 'Autenticación'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint verifica un token de magic link y crea una sesión autenticada,
      enviando un token JWT en el cuerpo de la respuesta.
      El token JWT debe ser incluido en solicitudes posteriores para acceder a endpoints protegidos.'

      parameter name: :example, in: :body, schema: {
        type: :object,
        properties: {
          magic_link: {
            type: :object,
            properties: {
              token: {
                type: :string,
                description: 'Token de un solo uso generado previamente mediante el endpoint de magic_links'
              }
            },
            required: [ 'token' ]
          }
        },
        required: [ 'magic_link' ]
      }

      response '200', 'token de autenticación creado' do
        schema '$ref' => '#/components/schemas/auth_success_response'

        let(:user) { create(:user) }
        let(:magic_link) { user.magic_link_tokens.create! }
        let(:example) { { magic_link: { token: magic_link.token } } }

        it 'returns the token in the response body' do
          json_response = JSON.parse(response.body)
          expect(json_response['success']).to eq(true)
          expect(json_response['token']).to be_present
        end

        run_test!
      end

      response '401', 'token de autenticación no válido' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el token proporcionado no es válido,
        ha expirado o ya ha sido utilizado.'

        let(:user) { create(:user) }
        let(:magic_link) do
          magic_token = user.magic_link_tokens.create!
          magic_token.update!(used: true)
          magic_token
        end
        let(:example) { { magic_link: { token: magic_link.token } } }

        it 'returns an error message' do
          json_response = JSON.parse(response.body)
          expect(json_response['error']).to be_present
        end

        run_test!
      end
    end
  end
end
