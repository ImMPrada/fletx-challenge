class AddFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :name, :string
    add_column :users, :last_name, :string
    add_column :users, :work_position, :string
    add_column :users, :phone_number, :string
    add_column :users, :salary, :decimal, precision: 10, scale: 2

    add_reference :users, :company, foreign_key: true
  end
end
