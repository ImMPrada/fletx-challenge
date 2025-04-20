class City < ApplicationRecord
  belongs_to :department
  has_many :companies, dependent: :nullify # si llegase a ser necesario eliminar una city, se mantendrían los registros de las empresas asociadas a esa ciudad
  validates :name, presence: true, uniqueness: { scope: :department_id }
end
