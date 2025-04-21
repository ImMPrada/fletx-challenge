module Api
  module V1
    class SessionsController < BaseController
      def destroy
        # Con Denylist, Devise se encargará de revocar el token automáticamente
        # Solo hay que asegurarse de enviar el token en la solicitud

        if current_user
          # Revoca el token actual
          token = extract_jwt_token
          JwtDenylist.create!(jti: token, exp: Time.now + 2.days)

          render json: { message: "Sesión cerrada correctamente" }, status: :ok
        else
          render json: { message: "No hay sesión activa" }, status: :unauthorized
        end
      end

      private

      # Este método debería estar disponible a través de JwtAuthenticable
      # Si no, agregarlo aquí
      def extract_jwt_token
        auth_header = request.headers["Authorization"]
        return auth_header.split(" ").last if auth_header.present? && auth_header.start_with?("Bearer ")

        request.headers["X-JWT-Token"]
      end
    end
  end
end
