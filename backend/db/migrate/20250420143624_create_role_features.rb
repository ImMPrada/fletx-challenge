class CreateRoleFeatures < ActiveRecord::Migration[8.0]
  def change
    create_table :role_features do |t|
      t.references :role, null: false, foreign_key: true
      t.references :feature, null: false, foreign_key: true
      t.timestamps
    end
  end
end
