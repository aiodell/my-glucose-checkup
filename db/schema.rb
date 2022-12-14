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

ActiveRecord::Schema[7.0].define(version: 2022_10_05_135446) do
  create_table "bgl_events", force: :cascade do |t|
    t.integer "bgl_id", null: false
    t.integer "event_id", null: false
    t.index ["bgl_id"], name: "index_bgl_events_on_bgl_id"
    t.index ["event_id"], name: "index_bgl_events_on_event_id"
  end

  create_table "bgls", force: :cascade do |t|
    t.integer "value"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_bgls_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "category"
  end

  create_table "profiles", force: :cascade do |t|
    t.integer "month"
    t.integer "day"
    t.integer "year"
    t.string "phone"
    t.boolean "allow_followers"
    t.boolean "family_member"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "provider_column_in_users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.boolean "admin"
    t.boolean "has_profile"
  end

  add_foreign_key "bgl_events", "bgls"
  add_foreign_key "bgl_events", "events"
  add_foreign_key "bgls", "users"
end
