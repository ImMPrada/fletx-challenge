json.id product.id
json.name product.name
json.category product.category
json.price product.price.to_f
json.company do
  json.id product.company.id
  json.name product.company.name
end
