class CreateRoles < ActiveRecord::Migration[8.0]
  def change
    create_table :roles do |t|
      t.string :code, null: false, index: { unique: true }
      t.string :description, null: false
      t.timestamps
    end
  end
end
