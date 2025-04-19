module JwtAuthenticable
  extend ActiveSupport::Concern

  included do
  end

  attr_reader :current_user

  private

  def authenticate_user!
    jwt_token = extract_jwt_token
    if jwt_token.blank?
      raise AuthErrors::AuthenticationRequired
    end

    payload = decode_jwt_token(jwt_token)
    if payload.blank? || !payload["sub"]
      raise AuthErrors::InvalidToken
    end

    @current_user = User.find_by(id: payload["sub"])
    unless @current_user
      raise AuthErrors::UserNotFound
    end
  end

  def extract_jwt_token
    auth_header = request.headers["Authorization"]
    return auth_header.split(" ").last if auth_header.present? && auth_header.start_with?("Bearer ")

    request.cookies["jwt"] || request.headers["X-JWT-Token"]
  end

  def decode_jwt_token(token)
    return nil unless token.present?

    begin
      secret = Rails.application.credentials.secret_key_base
      JWT.decode(token, secret, true, { algorithm: "HS256" }).first
    rescue JWT::DecodeError => e
      Rails.logger.error("JWT decode error: #{e.message}")
      nil
    end
  end
end
