class AddLatitudeAndLongitudeToFarm < ActiveRecord::Migration
  def change
    add_column :farms, :latitude, :decimal, precision: 9, scale: 6
    add_column :farms, :longitude, :decimal, precision: 9, scale: 6
  end
end
