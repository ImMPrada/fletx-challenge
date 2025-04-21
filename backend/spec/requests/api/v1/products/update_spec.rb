require 'swagger_helper'

RSpec.describe 'Products API', type: :request do
  path '/api/v1/products/{id}' do
    put 'Actualiza un producto existente' do
      tags 'Productos'
      consumes 'application/json'
      produces 'application/json'
      description 'Este endpoint permite actualizar todos los campos de un producto existente. Requiere autenticación.'

      security [
        { bearer_auth: [] },
        { api_key_auth: [] }
      ]

      parameter name: :id, in: :path, type: :integer, description: 'ID del producto a actualizar', required: true
      parameter name: :product_params, in: :body, schema: {
        '$ref' => '#/components/schemas/product_request'
      }

      response '200', 'producto actualizado correctamente' do
        schema '$ref' => '#/components/schemas/product'

        let(:user) { create_user_with_features("products.update", role_code: "admin") }
        let(:company) { create(:company) }
        let(:product) { create(:product, name: 'Producto Original', category: 'Electrónica', price: 1000.0, company: company) }
        let(:id) { product.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:product_params) do
          {
            product: {
              name: 'Producto Actualizado',
              category: 'Informática',
              price: 1800.0,
              company_id: company.id
            }
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to include('id', 'name', 'category', 'price')
          expect(data['id']).to eq(product.id)
          expect(data['name']).to eq('Producto Actualizado')
          expect(data['category']).to eq('Informática')
          expect(data['price']).to eq(1800.0)
          expect(data['company']).to include('id', 'name')
          expect(data['company']['id']).to eq(company.id)
        end
      end

      response '401', 'no autorizado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando no se proporciona un token JWT válido o cuando éste ha expirado.'

        let(:product) { create(:product) }
        let(:id) { product.id }
        let(:product_params) do
          {
            product: {
              name: 'Producto Actualizado',
              category: 'Informática',
              price: 1800.0,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '403', 'sin autorización para esta acción' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el usuario autenticado no tiene permiso para actualizar productos.'

        let(:user) { create_user_with_features([], role_code: "user") } # Un rol sin el feature products.update
        let(:company) { create(:company) }
        let(:product) { create(:product, company: company) }
        let(:id) { product.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:product_params) do
          {
            product: {
              name: 'Producto Actualizado',
              category: 'Informática',
              price: 1800.0,
              company_id: company.id
            }
          }
        end

        run_test!
      end

      response '404', 'producto no encontrado' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando el producto especificado no existe.'

        let(:user) { create_user_with_features("products.update", role_code: "admin") }
        let(:id) { 999 } # ID de producto que no existe
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:product_params) do
          {
            product: {
              name: 'Producto Actualizado',
              category: 'Informática',
              price: 1800.0,
              company_id: 1
            }
          }
        end

        run_test!
      end

      response '422', 'entidad no procesable' do
        schema '$ref' => '#/components/schemas/error_response'
        description 'Esta respuesta ocurre cuando los datos proporcionados no son válidos para actualizar el producto.'

        let(:user) { create_user_with_features("products.update", role_code: "admin") }
        let(:company) { create(:company) }
        let(:product) { create(:product, company: company) }
        let(:id) { product.id }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }
        let(:product_params) do
          {
            product: {
              name: '',  # Nombre vacío para provocar error de validación
              category: 'Informática',
              price: 1800.0,
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
