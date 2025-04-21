require 'swagger_helper'

RSpec.describe 'Products API', type: :request do
  path '/api/v1/products' do
    post 'Crea un nuevo producto' do
      tags 'Productos'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint permite crear un nuevo producto. Requiere autenticación.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      parameter name: :product_params, in: :body, schema: {
        '$ref' => '#/components/schemas/product_request'
      }

      response '200', 'producto creado' do
        schema '$ref' => '#/components/schemas/product'

        let(:user) { create_user_with_features("products.create", role_code: "admin") }
        let(:company) { create(:company) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:product_params) do
          {
            product: {
              name: 'Producto A',
              category: 'Electrónica',
              price: 1500.0,
              company_id: company.id
            }
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to include('id', 'name', 'category', 'price')
          expect(data['name']).to eq('Producto A')
          expect(data['category']).to eq('Electrónica')
          expect(data['price']).to eq(1500.0)
          expect(data['company']).to include('id', 'name')
          expect(data['company']['id']).to eq(company.id)
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:product_params) do
          {
            product: {
              name: 'Producto A',
              category: 'Electrónica',
              price: 1500.0,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario autenticado no tiene permiso para crear productos.'

        let(:user) { create_user_with_features([], role_code: "user") } # Un rol sin el feature products.create
        let(:company) { create(:company) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:product_params) do
          {
            product: {
              name: 'Producto A',
              category: 'Electrónica',
              price: 1500.0,
              company_id: company.id
            }
          }
        end

        run_test!
      end

      response '422', 'entidad no procesable' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando los datos proporcionados no son válidos para crear un producto.'

        let(:user) { create_user_with_features("products.create", role_code: "admin") }
        let(:company) { create(:company) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:product_params) do
          {
            product: {
              name: '',  # Nombre vacío para provocar error de validación
              category: 'Electrónica',
              price: 1500.0,
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

  def create_user_with_features(feature_codes, role_code: "user")
    feature_codes = Array(feature_codes)
    role = create(:role, code: role_code)

    features = feature_codes.map do |code|
      create(:feature, code: code)
    end

    features.each do |feature|
      create(:role_feature, role: role, feature: feature)
    end

    create(:user, role: role)
  end
end
