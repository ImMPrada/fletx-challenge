json.id company.id
json.name company.name
json.category company.category
json.address company.address
json.phone_number company.phone_number
json.assets company.assets
json.liabilities company.liabilities
json.department json.partial! "api/v1/departments/department", department: company.department
json.city json.partial! "api/v1/departments/city", city: company.city
