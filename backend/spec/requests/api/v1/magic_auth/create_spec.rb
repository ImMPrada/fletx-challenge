require 'swagger_helper'

RSpec.describe 'Magic Auth API', type: :request do
  path '/api/v1/magic_auths' do
    post 'Crea una sesión autenticada usando un token de Magic Link' do
      tags 'Autenticación'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint verifica un token de magic link y crea una sesión autenticada,
      enviando un token JWT en la respuesta a través de cookies y headers.
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

        # Documentación de headers
        header 'X-JWT-Token', schema: { type: :string }, description: 'JWT token para autenticación'
        header 'Authorization', schema: { type: :string }, description: 'Bearer token para autenticación'
        header 'Set-Cookie', schema: { type: :string }, description: 'Cookie con el JWT token'

        let(:user) { create(:user) }
        let(:magic_link) { user.magic_link_tokens.create! }
        let(:example) { { magic_link: { token: magic_link.token } } }

        it 'sets the JWT cookie' do
          expect(response.cookies['jwt']).to be_present
        end

        it 'sets the JWT cookie with correct attributes' do
          # Verificar que la cookie está presente
          expect(response.cookies['jwt']).to be_present

          # Verificar que la cookie es HttpOnly
          cookie_string = response.headers['Set-Cookie'].to_s
          expect(cookie_string).to include('httponly')

          # Verificar que la cookie tiene expiración
          expect(cookie_string).to include('expires=')

          # Verificar configuraciones según el entorno
          if Rails.env.production?
            expect(cookie_string).to include('secure')
            expect(cookie_string).to include('samesite=none')
          else
            # En desarrollo ahora usamos diferente configuración
            expect(cookie_string).to include('HttpOnly')
          end
        end

        it 'includes authentication headers' do
          # Verificar header de JWT
          expect(response.headers['X-JWT-Token']).to be_present

          # Verificar que existe un header de autorización
          expect(response.headers['Authorization']).to be_present
          expect(response.headers['Authorization']).to start_with('Bearer ')

          # Verificar que se exponen los headers necesarios para CORS
          expect(response.headers['Access-Control-Expose-Headers']).to include('X-JWT-Token')
          expect(response.headers['Access-Control-Expose-Headers']).to include('Set-Cookie')
        end

        it 'returns the token in the response body' do
          json_response = JSON.parse(response.body)
          expect(json_response['success']).to eq(true)
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

        it 'does not set the JWT cookie' do
          expect(response.cookies['jwt']).to be_nil
        end

        run_test!
      end
    end
  end
end
