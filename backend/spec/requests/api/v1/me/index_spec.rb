require 'swagger_helper'

RSpec.describe 'Me API', type: :request do
  path '/api/v1/me' do
    get 'Obtiene información del usuario autenticado' do
      tags 'Perfil'
      produces 'application/json'
      description 'Este endpoint devuelve la información del usuario actualmente autenticado.
      Requiere un token JWT válido que debe ser enviado en los headers.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      response '200', 'información del usuario' do
        schema type: :object,
               properties: {
                 email: { type: :string, example: 'usuario@example.com' }
               },
               required: [ 'email' ]

        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:user) { create(:user) }

        run_test!
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
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end
end
