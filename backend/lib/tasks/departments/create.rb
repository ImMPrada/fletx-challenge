require "rake"
require "json"
require "net/http"
require "rails"

namespace :departments do
  desc "Create departments and cities from Colombia JSON data"
  task create: :environment do
    url = "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json"
    uri = URI(url)
    response = Net::HTTP.get(uri)

    begin
      data = JSON.parse(response)
      puts "Datos cargados correctamente. #{data.size} departamentos encontrados."

      data.each do |department|
        dept_name = department["departamento"]
        cities = department["ciudades"]

        puts "Departamento: #{dept_name}"
        puts "Número de ciudades: #{cities.size}"

        department = Department.find_or_create_by!(name: dept_name)
        cities.each do |city_name|
          City.find_or_create_by!(name: city_name, department:)
        end

        puts "Departamento y ciudades creados correctamente."
      end
    rescue JSON::ParserError => e
      puts "Error al parsear el JSON: #{e.message}"
    end
  end
end
