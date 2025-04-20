class City < ApplicationRecord
  belongs_to :department

  validates :name, presence: true, uniqueness: { scope: :department_id }
end
