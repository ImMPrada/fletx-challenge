json.array! @departments do |department|
  json.id department.id
  json.name department.name
  json.cities department.cities do |city|
    json.id city.id
    json.name city.name
  end
end
