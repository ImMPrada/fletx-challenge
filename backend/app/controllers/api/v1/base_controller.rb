module Api
  module V1
    class BaseController < ApplicationController
      include JwtAuthenticable
      include Authorizable

      rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
      rescue_from AuthErrors::Base, MagicLinkErrors::Base, with: :render_unauthorized_response
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
      rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

      before_action :authenticate_user!

      private

      def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors }, status: :unprocessable_entity
      end

      def render_unauthorized_response(exception)
        render json: { error: exception.message }, status: :unauthorized
      end

      def render_not_found_response(exception)
        render json: { error: exception.message }, status: :not_found
      end
    end
  end
end
