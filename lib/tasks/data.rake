require 'parse'

namespace :data do
  desc 'scrape data with nokogiri'
  task :scrape => :environment do
    scrape_data
  end
end