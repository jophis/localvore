class RemoveColumns < ActiveRecord::Migration
  def self.up
  	remove_column :farms, :longitude 
  	remove_column :farms, :latitude 
  	remove_column :merchants, :longitude 
  	remove_column :merchants, :latitude 
  end
end
