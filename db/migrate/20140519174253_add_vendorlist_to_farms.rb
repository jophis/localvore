class AddVendorlistToFarms < ActiveRecord::Migration
  def change
    add_column :farms, :vendor_list, :text
  end
end
