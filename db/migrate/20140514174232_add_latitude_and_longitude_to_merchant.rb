class AddLatitudeAndLongitudeToMerchant < ActiveRecord::Migration
  def change
    add_column :merchants, :latitude, :decimal, precision: 9, scale: 6
    add_column :merchants, :longitude, :decimal, precision: 9, scale: 6
  end
end
