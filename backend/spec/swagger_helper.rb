# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'FLETX API',
        version: 'v1',
        description: 'API documentation for FLETX application'
      },
      paths: {},
      components: {
        schemas: {
          magic_link_success_response: {
            type: :object,
            properties: {
              magic_link: {
                type: :object,
                properties: {
                  message: { type: :string, example: "Se ha enviado un enlace mágico a tu correo electrónico" }
                },
                required: [ 'message' ]
              }
            },
            required: [ 'magic_link' ],
            description: 'Respuesta enviada cuando se solicita un magic link'
          },
          auth_success_response: {
            type: :object,
            properties: {
              success: { type: :boolean, example: true },
              token: { type: :string, example: "eyJhbGciOiJIUzI1NiJ9..." }
            },
            required: [ 'success', 'token' ],
            description: 'Respuesta enviada cuando la autenticación es exitosa. El token JWT se envía en el cuerpo de la respuesta.'
          },
          error_response: {
            type: :object,
            oneOf: [
              {
                properties: {
                  error: { type: :string, example: "Token expirado" }
                },
                required: [ 'error' ]
              },
              {
                properties: {
                  errors: {
                    type: :array,
                    items: { type: :string },
                    example: [ "Email is invalid" ]
                  }
                },
                required: [ 'errors' ]
              },
              {
                properties: {
                  errors: {
                    type: :object,
                    additionalProperties: {
                      type: :array,
                      items: { type: :string }
                    },
                    example: { "name": [ "can't be blank" ] }
                  }
                },
                required: [ 'errors' ]
              }
            ],
            description: 'Respuesta enviada cuando ocurre un error de autenticación o validación'
          },
          city: {
            type: :object,
            properties: {
              id: { type: :integer, example: 1 },
              name: { type: :string, example: 'Medellín' }
            },
            required: [ 'id', 'name' ],
            description: 'Información básica de una ciudad'
          },
          department: {
            type: :object,
            properties: {
              id: { type: :integer, example: 1 },
              name: { type: :string, example: 'Antioquia' },
              cities: {
                type: :array,
                items: { '$ref' => '#/components/schemas/city' }
              }
            },
            required: [ 'id', 'name', 'cities' ],
            description: 'Información de un departamento con sus ciudades asociadas'
          },
          departments_response: {
            type: :array,
            items: { '$ref' => '#/components/schemas/department' },
            description: 'Lista de departamentos con sus ciudades asociadas'
          },
          role: {
            type: :object,
            properties: {
              id: { type: :integer, example: 1 },
              code: { type: :string, example: 'admin' },
              description: { type: :string, example: 'Administrador' }
            },
            required: [ 'id', 'code', 'description' ],
            description: 'Información de un rol de usuario'
          },
          user: {
            type: :object,
            properties: {
              id: { type: :integer, example: 1 },
              email: { type: :string, example: 'usuario@example.com' },
              name: { type: :string, example: 'Juan' },
              last_name: { type: :string, example: 'Pérez' },
              work_position: { type: :string, example: 'Gerente de Operaciones' },
              phone_number: { type: :string, example: '3001234567' },
              salary: { type: :number, format: :float, example: 50000.0 },
              role: {
                type: :object,
                properties: {
                  id: { type: :integer, example: 1 },
                  code: { type: :string, example: 'admin' },
                  description: { type: :string, example: 'Administrador' }
                }
              },
              company: {
                type: :object,
                properties: {
                  id: { type: :integer, example: 1 },
                  name: { type: :string, example: 'FLETX Inc.' }
                }
              }
            },
            required: [ 'id', 'email', 'name', 'last_name', 'role' ],
            description: 'Información del usuario'
          },
          users_response: {
            type: :array,
            items: { '$ref' => '#/components/schemas/user' },
            description: 'Lista de usuarios'
          },
          company: {
            type: :object,
            properties: {
              id: { type: :integer, example: 1 },
              name: { type: :string, example: 'FLETX Inc.' },
              category: { type: :string, example: 'Transporte' },
              address: { type: :string, example: 'Calle Principal 123' },
              phone_number: { type: :string, example: '3001234567' },
              assets: { type: :string, example: '100000.0' },
              liabilities: { type: :string, example: '50000.0' },
              department: {
                type: :object,
                nullable: true,
                properties: {
                  id: { type: :integer },
                  name: { type: :string }
                }
              },
              city: {
                type: :object,
                nullable: true,
                properties: {
                  id: { type: :integer },
                  name: { type: :string }
                }
              }
            },
            required: [ 'id', 'name', 'category', 'address', 'phone_number', 'assets', 'liabilities' ],
            description: 'Información completa de una empresa'
          },
          user_request: {
            type: :object,
            properties: {
              user: {
                type: :object,
                properties: {
                  name: { type: :string, example: 'Juan' },
                  last_name: { type: :string, example: 'Pérez' },
                  email: { type: :string, example: 'juan.perez@example.com' },
                  role_id: { type: :integer, example: 1 },
                  company_id: { type: :integer, example: 1 },
                  work_position: { type: :string, example: 'Gerente de Operaciones' },
                  phone_number: { type: :string, example: '3001234567' },
                  salary: { type: :number, format: :float, example: 50000.0 }
                },
                required: [ 'name', 'last_name', 'email', 'role_id', 'company_id' ]
              }
            },
            required: [ 'user' ],
            description: 'Solicitud para crear un nuevo usuario'
          },
          company_request: {
            type: :object,
            properties: {
              company: {
                type: :object,
                properties: {
                  name: { type: :string, example: 'FLETX Inc.' },
                  category: { type: :string, example: 'Transporte' },
                  address: { type: :string, example: 'Calle Principal 123' },
                  phone_number: { type: :string, example: '3001234567' },
                  assets: { type: :number, format: :float, example: 100000.0 },
                  liabilities: { type: :number, format: :float, example: 50000.0 },
                  city_id: { type: :integer, example: 1 }
                },
                required: [ 'name', 'category', 'address', 'phone_number', 'assets', 'liabilities', 'city_id' ]
              }
            },
            required: [ 'company' ],
            description: 'Solicitud para crear una nueva empresa'
          },
          product: {
            type: :object,
            properties: {
              id: { type: :integer, example: 1 },
              name: { type: :string, example: 'Producto A' },
              category: { type: :string, example: 'Electrónica' },
              price: { type: :number, format: :float, example: 1500.0 },
              company: {
                type: :object,
                properties: {
                  id: { type: :integer, example: 1 },
                  name: { type: :string, example: 'FLETX Inc.' }
                }
              }
            },
            required: [ 'id', 'name', 'category', 'price', 'company' ],
            description: 'Información completa de un producto'
          },
          product_request: {
            type: :object,
            properties: {
              product: {
                type: :object,
                properties: {
                  name: { type: :string, example: 'Producto A' },
                  category: { type: :string, example: 'Electrónica' },
                  price: { type: :number, format: :float, example: 1500.0 },
                  company_id: { type: :integer, example: 1 }
                },
                required: [ 'name', 'category', 'price', 'company_id' ]
              }
            },
            required: [ 'product' ],
            description: 'Solicitud para crear o actualizar un producto'
          }
        },
        securitySchemes: {
          bearer_auth: {
            type: :http,
            scheme: :bearer,
            bearerFormat: 'JWT'
          },
          api_key_auth: {
            type: :apiKey,
            name: 'X-JWT-Token',
            in: :header
          }
        },
        headers: {
          'X-JWT-Token': {
            description: 'JWT token for authentication',
            schema: {
              type: :string
            }
          }
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ]
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
