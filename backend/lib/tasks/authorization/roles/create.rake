require "terminal-table"

namespace :authorization do
  namespace :roles do
    desc "Create roles"
    task create: :environment do
      require "yaml"
      roles = YAML.load_file(Rails.root.join("config/data/roles.yml"))

      table = Terminal::Table.new
      table.headings = %w[Code Description Feature]

      roles.each do |role|
        created_role = Role.find_or_initialize_by(code: role["code"]).tap do |r|
          r.description = role["description"]
          r.features = role["features"].map { |feature| Feature.find_by(code: feature) }
          r.save!
        end

        role["features"].each do |feature|
          created_role.role_features.destroy_all
          created_role.role_features.create!(feature: Feature.find_by(code: feature))

          table.add_row([ created_role.code, created_role.description, feature ])
        end
      end

      puts table
    end
  end
end
