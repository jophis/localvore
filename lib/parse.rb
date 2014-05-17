require 'nokogiri'
require 'open-uri'

# page used to test scraper
# page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/737"))

# code used to scrape products by category
# product_table = page.css(".products_delivery_table_grower")
# categories = {}
    # product_table.each do |table|
    #   product_array = []
    #   key = table.css(".product_cell_header_category").text
    #   table.css(".product_cell").each do |product|
    #     product_array << product.text
    #   end
    #   categories[key] =  product_array
    # end

def scrape_data
  list_page = Nokogiri::HTML(open('http://greenbeltfresh.ca/grower-producer-list'))
  even_links = list_page.css(".even a").map { |link| link['href'] }
  odd_links = list_page.css(".odd a").map { |link| link['href'] }
  links = even_links + odd_links
  links.each do |url|
    page = Nokogiri::HTML(open("http://greenbeltfresh.ca/#{url}"))
    name = page.at_css(".div_profile h1").text
    location = page.at_css("div .right_profile_text").children
    address = [location[0], location[2]].join(", ")
    phone_number = location[6].try(:text)
    description = page.at_css(".div_profile p:nth-of-type(3)").try(:text)
    website = page.at_css(".web a").try(:text)
    product_array = []
    page.css(".product_cell").each do |product|
      product_array << product.text
    end


    Farm.create!(
      name: name,
      address: address, 
      phone_number: phone_number,
      description: description,
      website: website,
      tag_list: product_array
      )

  end
end