require 'swagger_helper'

RSpec.describe 'Products API', type: :request do
  path '/api/v1/products' do
    get 'Obtiene listado de productos' do
      tags 'Productos'
      produces 'application/json'
      description 'Este endpoint devuelve el listado de todos los productos. Requiere autenticación y permisos adecuados.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      response '200', 'listado de productos' do
        schema type: :array, items: { '$ref' => '#/components/schemas/product' }

        let(:user) { create_user_with_features("products.list", role_code: "admin") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let!(:company) { create(:company) }
        let!(:product1) { create(:product, name: 'Producto A', company: company) }
        let!(:product2) { create(:product, name: 'Producto B', company: company) }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to be_an(Array)
          expect(data.length).to be >= 2
          expect(data.first).to include('id', 'name', 'category', 'price')
          expect(data.first['company']).to include('id', 'name')
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario no tiene los permisos necesarios para listar productos.'

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
