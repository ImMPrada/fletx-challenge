require 'swagger_helper'

RSpec.describe 'Products API', type: :request do
  path '/api/v1/products/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'ID del producto a consultar'

    get 'Obtiene detalles de un producto específico' do
      tags 'Productos'
      produces 'application/json'
      description 'Devuelve la información detallada de un producto específico por su ID. Requiere autenticación y permisos adecuados.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      response '200', 'detalle de producto' do
        schema '$ref' => '#/components/schemas/product'

        let(:user) { create_user_with_features("products.read", role_code: "admin") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let!(:company) { create(:company) }
        let!(:product) { create(:product, name: 'Producto A', company: company) }
        let(:id) { product.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to include('id', 'name', 'category', 'price')
          expect(data['id']).to eq(product.id)
          expect(data['name']).to eq('Producto A')
          expect(data).to have_key('company')
          expect(data['company']).to include('id', 'name')
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:id) { 1 }

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario no tiene los permisos necesarios para ver el producto.'

        let(:user) { create(:user) } # Usuario sin permisos específicos
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let!(:company) { create(:company) }
        let!(:product) { create(:product, company: company) }
        let(:id) { product.id }

        run_test!
      end

      response '404', 'producto no encontrado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no existe un producto con el ID proporcionado.'

        let(:user) { create_user_with_features("products.read", role_code: "admin") }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:id) { 999999 } # ID que no existe

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
