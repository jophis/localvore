require 'nokogiri'
require 'open-uri'

page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/737"))
farm_name = page.css(".div_profile h1")
address = page.at_css("div .right_profile_text").children
website = page.at_css(".web a")


# address[0].children[0]
# address[0].children[2]
# @address.street = address[1]
# @address.province = address[3]

product_table = page.css(".products_delivery_table_grower")

categories = {}
product_table.each do |table|
  product_array = []
  key = table.css(".product_cell_header_category").text
  table.css(".product_cell").each do |product|
    product_array << product.text
  end
  categories[key] =  product_array
end
puts website
puts [address[0], address[2]].join(", ")