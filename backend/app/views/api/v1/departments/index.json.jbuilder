json.array! @departments do |department|
  json.partial! "api/v1/departments/department", department: department
  json.cities department.cities do |city|
    json.partial! "api/v1/departments/city", city: city
  end
end
