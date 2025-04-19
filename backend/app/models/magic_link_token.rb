class MagicLinkToken < ApplicationRecord
  belongs_to :user
  before_create :generate_token

  DEFAULT_EXPIRATION_TIME = 5.minutes

  def self.verify!(raw_token)
    token = find_by(token: raw_token)
    return false unless token

    raise MagicLinkErrors::ExpiredToken unless token.usable?

    token.update!(used: true)
    token
  end

  def usable?
    !used && expires_at > Time.current
  end

  private

  def generate_token
    self.token = SecureRandom.urlsafe_base64(32)
    self.expires_at ||= DEFAULT_EXPIRATION_TIME.from_now
    self.used = false
  end
end
