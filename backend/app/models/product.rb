class Product < ApplicationRecord
  belongs_to :company

  validates :name, presence: true
  validates :category, presence: true
  validates :price, presence: true
end
