class Company < ApplicationRecord
  belongs_to :department
  belongs_to :city

  has_many :users, dependent: :destroy

  validates :name, :category, :address, :phone_number, :assets, :liabilities, presence: true
end
