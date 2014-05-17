class CreateMerchantfarms < ActiveRecord::Migration
  def change
    create_table :merchantfarms do |t|
      t.integer :farm_id, :null => false
      t.integer :merchant_id, :null => false

      t.timestamps
    end
  end
end
