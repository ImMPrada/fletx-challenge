class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :name, null: false, index: true
      t.string :category, null: false
      t.decimal :price, precision: 10, scale: 2, null: false

      t.references :company, null: false, foreign_key: true
      t.timestamps
    end
  end
end
