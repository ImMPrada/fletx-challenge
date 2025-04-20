class Department < ApplicationRecord
  has_many :cities, dependent: :destroy
  has_many :companies, dependent: :nullify # si llegase a ser necesario eliminar un department, se mantendrían los registros de las empresas asociadas a esa ciudad

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
