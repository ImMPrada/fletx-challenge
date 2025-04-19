module Api
  module V1
    class BaseController < ApplicationController
      include JwtAuthenticable

      rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
      rescue_from AuthErrors::Base, MagicLinkErrors::Base, with: :render_unauthorized_response

      before_action :authenticate_user!

      private

      def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
      end

      def render_unauthorized_response(exception)
        render json: { error: exception.message }, status: :unauthorized
      end
    end
  end
end
