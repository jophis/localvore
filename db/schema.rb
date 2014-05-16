# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140516180944) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "breakpoints", force: true do |t|
    t.integer  "pledge"
    t.text     "info"
    t.string   "pledge_title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "project_id"
  end

  create_table "comments", force: true do |t|
    t.text     "comment_text"
    t.integer  "project_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "farms", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "phone_number"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "latitude",     precision: 9, scale: 6
    t.decimal  "longitude",    precision: 9, scale: 6
    t.string   "website"
  end

  create_table "merchants", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "phone_number"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "latitude",     precision: 9, scale: 6
    t.decimal  "longitude",    precision: 9, scale: 6
    t.string   "source_list"
  end

  create_table "pledges", force: true do |t|
    t.integer  "project_id"
    t.integer  "breakpoint_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "projects", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "goal"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "pledge_total"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer  "owner_id"
    t.string   "category"
  end

  create_table "taggings", force: true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree

  create_table "tags", force: true do |t|
    t.string "name"
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                        null: false
    t.string   "crypted_password",             null: false
    t.string   "salt",                         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_me_token"
    t.datetime "remember_me_token_expires_at"
    t.string   "name"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["remember_me_token"], name: "index_users_on_remember_me_token", using: :btree

end
