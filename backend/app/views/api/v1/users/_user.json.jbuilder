json.id user.id
json.email user.email
json.name user.name
json.last_name user.last_name
json.work_position user.work_position
json.phone_number user.phone_number
json.salary user.salary.to_f
json.role do
  json.partial! "api/v1/roles/role", role: user.role
end

if user.company.present?
  json.company do
    json.id user.company.id
    json.name user.company.name
  end
end
