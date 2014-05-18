class CreateFarmsMerchantsJoin < ActiveRecord::Migration
  def change
    create_table :farms_merchants, id: false do |t|
      t.column :farm_id, :integer
      t.column :merchant_id, :integer
    end
  end
end
