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
              success: { type: :boolean, example: true }
            },
            required: [ 'success' ],
            description: 'Respuesta enviada cuando la autenticación es exitosa. El token JWT se envía en los headers y cookies, no en el cuerpo.'
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
              }
            ],
            description: 'Respuesta enviada cuando ocurre un error de autenticación o validación'
          }
        },
        securitySchemes: {
          bearer_auth: {
            type: :http,
            scheme: :bearer,
            bearerFormat: 'JWT'
          },
          cookie_auth: {
            type: :apiKey,
            name: 'jwt',
            in: :cookie
          }
        },
        headers: {
          'X-JWT-Token': {
            description: 'JWT token for authentication',
            schema: {
              type: :string
            }
          },
          'Set-Cookie': {
            description: 'Cookie containing the JWT token',
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
