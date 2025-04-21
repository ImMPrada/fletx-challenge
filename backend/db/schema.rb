# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_20_235019) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "department_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["department_id"], name: "index_cities_on_department_id"
    t.index ["name", "department_id"], name: "index_cities_on_name_and_department_id", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.string "category", null: false
    t.string "phone_number", null: false
    t.string "address", null: false
    t.decimal "assets", precision: 15, scale: 2, null: false
    t.decimal "liabilities", precision: 15, scale: 2, null: false
    t.bigint "department_id", null: false
    t.bigint "city_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_companies_on_city_id"
    t.index ["department_id"], name: "index_companies_on_department_id"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_departments_on_name", unique: true
  end

  create_table "features", force: :cascade do |t|
    t.string "code", null: false
    t.string "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_features_on_code", unique: true
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "magic_link_tokens", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "token"
    t.datetime "expires_at"
    t.boolean "used"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_magic_link_tokens_on_user_id"
  end

  create_table "role_features", force: :cascade do |t|
    t.bigint "role_id", null: false
    t.bigint "feature_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feature_id"], name: "index_role_features_on_feature_id"
    t.index ["role_id"], name: "index_role_features_on_role_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "code", null: false
    t.string "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_roles_on_code", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "role_id", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "cities", "departments"
  add_foreign_key "companies", "cities"
  add_foreign_key "companies", "departments"
  add_foreign_key "magic_link_tokens", "users"
  add_foreign_key "role_features", "features"
  add_foreign_key "role_features", "roles"
  add_foreign_key "users", "roles"
end
