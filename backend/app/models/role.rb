class Role < ApplicationRecord
  has_many :role_features, dependent: :destroy
  has_many :features, through: :role_features

  validates :code, :description, presence: true
end
