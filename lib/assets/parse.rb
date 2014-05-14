require 'nokogiri'
require 'open-uri'

page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/737"))
name = page.css(".div_profile h1")
location = page.at_css("div .right_profile_text").children
website = page.at_css(".web a")
description = page.at_css(".div_profile p:nth-of-type(3)")
address = [location[0], location[2]].join(", ")
phone_number = location[6][1]
product_table = page.css(".products_delivery_table_grower")
list_page = Nokogiri::HTML(open('http://greenbeltfresh.ca/grower-producer-list'))
links = list_page.css(".even a").map { |link| link['href'] }

categories = {}
product_table.each do |table|
  product_array = []
  key = table.css(".product_cell_header_category").text
  table.css(".product_cell").each do |product|
    product_array << product.text
  end
  categories[key] =  product_array
end

p links


links.each do |url|
    page = Nokogiri::HTML(open("http://greenbeltfresh.ca/#{url}.html"))
    name = page.css(".div_profile h1")
    location = page.at_css("div .right_profile_text").children
    address = [location[0], location[2]].join(", ")
    phone_number = location[6][1]
    description = page.at_css(".div_profile p:nth-of-type(3)")
    website = page.at_css(".web a")
    product_table = page.css(".products_delivery_table_grower")
    categories.each { |category, product| }

    # create da model here
  end