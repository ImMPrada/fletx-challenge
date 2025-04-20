json.id company.id
json.name company.name
json.category company.category
json.address company.address
json.phone_number company.phone_number
json.assets company.assets
json.liabilities company.liabilities

if company.department
  json.department do
    json.partial! "api/v1/departments/department", department: company.department
  end
else
  json.department nil
end

if company.city
  json.city do
    json.partial! "api/v1/departments/city", city: company.city
  end
else
  json.city nil
end
