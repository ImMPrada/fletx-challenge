class Department < ApplicationRecord
  has_many :cities, dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
