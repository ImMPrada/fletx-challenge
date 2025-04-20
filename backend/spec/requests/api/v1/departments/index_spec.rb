require 'swagger_helper'

RSpec.describe 'Departments API', type: :request do
  path '/api/v1/departments' do
    get 'Obtiene listado de departamentos' do
      tags 'Departamentos'
      produces 'application/json'
      description 'Este endpoint devuelve el listado de todos los departamentos con sus ciudades asociadas.'

      response '200', 'listado de departamentos' do
        schema '$ref' => '#/components/schemas/departments_response'

        let!(:department1) { create(:department, name: 'Antioquia') }
        let!(:department2) { create(:department, name: 'Cundinamarca') }
        let!(:city1) { create(:city, name: 'Medellín', department: department1) }
        let!(:city2) { create(:city, name: 'Bogotá', department: department2) }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data).to be_an(Array)
          expect(data.length).to eq(2)
          expect(data.first['name']).to eq('Antioquia')
          expect(data.first['cities'].first['name']).to eq('Medellín')
          expect(data.second['name']).to eq('Cundinamarca')
          expect(data.second['cities'].first['name']).to eq('Bogotá')
        end
      end
    end
  end
end
