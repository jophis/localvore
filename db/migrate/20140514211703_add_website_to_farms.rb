class AddWebsiteToFarms < ActiveRecord::Migration
  def change
    add_column :farms, :website, :string
  end
end
