require 'swagger_helper'

RSpec.describe 'Example API', type: :request do
  before(:each) do
    ensure_visitor_role_exists
  end

  path '/api/v1/magic_links' do
    post 'Crea un magic link' do
      tags 'Magic Links'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :example, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string }
        },
        required: [ 'email' ]
      }

      response '200', 'magic link creado' do
        schema '$ref' => '#/components/schemas/magic_link_success_response'
        let(:example) { { email: 'test@example.com' } }
        run_test!
      end

      response '422', 'entidad no procesable' do
        schema '$ref' => '#/components/schemas/error_response'
        let(:example) { { email: 'invalid-email' } }
        run_test!
      end
    end
  end
end
