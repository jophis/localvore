require 'nokogiri'
require 'open-uri'

page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/737"))
name = page.css(".div_profile h1")
location = page.at_css("div .right_profile_text").children
website = page.at_css(".web a")
description = page.at_css(".div_profile p:nth-of-type(3)")
address = [location[0], location[2]].join(", ")
product_table = page.css(".products_delivery_table_grower")
phone_number = location[6][1]

# address[0].children[0]
# address[0].children[2]
# @address.street = address[1]
# @address.province = address[3]

categories = {}
product_table.each do |table|
  product_array = []
  key = table.css(".product_cell_header_category").text
  table.css(".product_cell").each do |product|
    product_array << product.text
  end
  categories[key] =  product_array
end
# puts farm_name
# puts categories
# puts website
# puts location
# puts description
# puts phone_number

# [18..853].each do |url|
#     page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/#{url.to_s}.html"))

#   end