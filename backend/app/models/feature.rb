class Feature < ApplicationRecord
  validates :code, :description, presence: true
end
