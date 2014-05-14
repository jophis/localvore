namespace :data do
  desc 'scrape date with nokogiri'
  task :scrape, [:name, :address, :phone_number, :description, :website] => [:environment] do |t, args|
    Farm.create!(
      name: args[:name],
      address: args[:address],
      phone_number: args[:phone_number],
      description: args[:description],
      website: args[:website]
      )
  end
end