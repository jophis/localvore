require 'nokogiri'
require 'open-uri'

# page used to test scraper
# page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/737"))

def scrape_data
  list_page = Nokogiri::HTML(open('http://greenbeltfresh.ca/grower-producer-list'))
  links = list_page.css(".even a").map { |link| link['href'] }
  links.each do |url|
    page = Nokogiri::HTML(open("http://greenbeltfresh.ca/#{url}.html"))
    product_table = page.css(".products_delivery_table_grower")
    name = page.at_css(".div_profile h1").text
    location = page.at_css("div .right_profile_text").children
    address = [location[0], location[2]].join(", ")
    phone_number = location[6].text
    description = page.at_css(".div_profile p:nth-of-type(3)").text
    website = page.at_css(".web a").text
    categories = {}
    product_table.each do |table|
      product_array = []
      key = table.css(".product_cell_header_category").text
      table.css(".product_cell").each do |product|
        product_array << product.text
      end
      categories[key] =  product_array
    end

    Farm.create!(
      name: name,
      address: address, 
      phone_number: phone_number,
      description: description,
      website: website,
      herb_list: categories["Flowers / Herbs"],
      fruit_list: categories["Fruits"],
      vegetable_list: categories["Vegetables"],
      grain_list: categories["Grains"],
      meat_list: categories["Meat"],
      dairy_list: categories["Dairy / Eggs"],
      nut_list: categories["Nuts / Seeds"],
      prepared_list: cagtegories["Prepared and Processed Foods"],
      beverage_list: categories["Wine and Beverages"]
      )

  end
end