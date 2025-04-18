require 'swagger_helper'

RSpec.describe 'Example API', type: :request do
  path '/api/v1/magic_auths' do
    post 'Crea un token de autenticación' do
      tags 'Magic Links'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :example, in: :body, schema: {
        type: :object,
        properties: {
          magic_link: {
            type: :object,
            properties: {
              token: { type: :string }
            },
            required: [ 'token' ]
          }
        },
        required: [ 'magic_link' ]
      }

      response '204', 'token de autenticación creado' do
        let(:user) { create(:user) }
        let(:magic_link) { user.magic_link_tokens.create! }
        let(:example) { { magic_link: { token: magic_link.token } } }

        it 'sets the JWT cookie' do
          expect(response.cookies['jwt']).to be_present
        end

        run_test!
      end

      response '401', 'token de autenticación no válido' do
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
