require 'swagger_helper'

RSpec.describe 'Example API', type: :request, skip: true do
  path '/api/v1/examples' do
    get 'Lista todos los ejemplos' do
      tags 'Examples'
      produces 'application/json'

      response '200', 'lista de ejemplos encontrada' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              description: { type: :string },
              created_at: { type: :string, format: :datetime },
              updated_at: { type: :string, format: :datetime }
            },
            required: [ 'id', 'name' ]
          }

        run_test!
      end
    end

    post 'Crea un ejemplo' do
      tags 'Examples'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :example, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string }
        },
        required: [ 'name' ]
      }

      response '201', 'ejemplo creado' do
        let(:example) { { name: 'Ejemplo nuevo', description: 'Descripción del ejemplo' } }
        run_test!
      end

      response '422', 'entidad no procesable' do
        let(:example) { { description: 'Falta el nombre' } }
        run_test!
      end
    end
  end

  path '/api/v1/examples/{id}' do
    parameter name: :id, in: :path, type: :integer

    get 'Obtiene un ejemplo' do
      tags 'Examples'
      produces 'application/json'

      response '200', 'ejemplo encontrado' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            description: { type: :string },
            created_at: { type: :string, format: :datetime },
            updated_at: { type: :string, format: :datetime }
          },
          required: [ 'id', 'name' ]

        let(:id) { 1 }
        run_test!
      end

      response '404', 'ejemplo no encontrado' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
