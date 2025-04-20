require "terminal-table"

namespace :authorization do
  namespace :features do
    desc "Create features"
    task create: :environment do
      require "yaml"
      features = YAML.load_file(Rails.root.join("config/data/features.yml"))

      table = Terminal::Table.new
      table.headings = %w[Code Description]

      features.each do |feature|
        Feature.find_or_initialize_by(code: feature["code"]).tap do |f|
          f.description = feature["description"]
          f.save!

          table.add_row([ f.code, f.description ])
        end
      end

      puts table
    end
  end
end
