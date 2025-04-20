# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# Load factories for development and test environments
require 'faker'
require 'byebug'

puts "Creating companies..."

5.times do
  company = Company.find_or_initialize_by(name: Faker::Company.name) do |company|
    company.category = Faker::Company.industry
    company.address = Faker::Address.street_address
    company.phone_number = Faker::PhoneNumber.cell_phone
    company.assets = Faker::Number.decimal(l_digits: 5, r_digits: 2)
    company.liabilities = Faker::Number.decimal(l_digits: 5, r_digits: 2)
    company.department = Department.order("RANDOM()").first
    company.city = City.order("RANDOM()").first
  end

  company.save!
end

puts "Companies created"
