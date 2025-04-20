class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.string :phone_number, null: false
      t.string :address, null: false
      t.decimal :assets, null: false, precision: 15, scale: 2
      t.decimal :liabilities, null: false, precision: 15, scale: 2
      t.references :department, null: false, foreign_key: true
      t.references :city, null: false, foreign_key: true

      t.timestamps
    end
  end
end
