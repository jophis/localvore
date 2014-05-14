class CreateMerchants < ActiveRecord::Migration
  def change
    create_table :merchants do |t|
    	t.string :name
    	t.string :address
    	t.string :phone_number
    	t.text :description

      t.timestamps
    end
  end
end
