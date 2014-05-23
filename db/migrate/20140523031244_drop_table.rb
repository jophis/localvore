class DropTable < ActiveRecord::Migration
  def change
    drop_table :breakpoints
    drop_table :comments
    drop_table :pledges
    drop_table :projects
    drop_table :users
  end
end
