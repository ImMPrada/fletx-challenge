json.id user.id
json.email user.email
json.name user.name
json.lastName user.last_name
json.workPosition user.work_position
json.phoneNumber user.phone_number
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
