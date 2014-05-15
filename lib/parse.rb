require 'nokogiri'
require 'open-uri'

# page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/737"))

  # product_array = []
  # page.css(".product_cell").each do |product|
  #   product_array << product.text
  # end

def scrape_data
  # list_page = Nokogiri::HTML(open('http://greenbeltfresh.ca/grower-producer-list'))
  # links = list_page.css(".even a").map { |link| link['href'] }
  # links.each do |url|
  page = Nokogiri::HTML(open("http://greenbeltfresh.ca/search-results-profile/737"))
  # page = Nokogiri::HTML(open("http://greenbeltfresh.ca/#{url}.html"))
  name = page.at_css(".div_profile h1").text
  location = page.at_css("div .right_profile_text").children
  address = [location[0], location[2]].join(", ")
  phone_number = location[6].text
  description = page.at_css(".div_profile p:nth-of-type(3)").text
  website = page.at_css(".web a").text

  Farm.create!(
    name: name,
    address: address, 
    phone_number: phone_number,
    description: description,
    website: website
    )

  # end
end