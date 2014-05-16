class AddSourceListToMerchants < ActiveRecord::Migration
  def change
    add_column :merchants, :source_list, :string
  end
end
