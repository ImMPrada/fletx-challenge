Dir[File.join(Rails.root, "lib", "tasks", "departments", "*.rb")].each do |file|
  load file
end
