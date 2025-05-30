class CreateCities < ActiveRecord::Migration[8.0]
  def change
    create_table :cities do |t|
      t.string :name, null: false
      t.references :department, null: false, foreign_key: true

      t.timestamps
    end

    add_index :cities, %i[name department_id], unique: true
  end
end
