require 'nokogiri'
require 'open-uri'

# def scrape products
page = Nokogiri::HTML(open('http://greenbeltfresh.ca/advanced_finder/1'))
div = page.css(".prod_category")
product_hash = {}
div.each do |section|
  product_array =[]
  key = section.css("legend").text
  section.css(".option190").each do |product|
    product_array << product.text
  end
  product_hash[key] = product_array
end
p product_hash
# end