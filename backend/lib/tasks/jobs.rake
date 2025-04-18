namespace :jobs do
  desc "Start processing jobs with DelayedJob"
  task work: :environment do
    Worker = Delayed::Worker

    worker_options = {
      min_priority: ENV["MIN_PRIORITY"],
      max_priority: ENV["MAX_PRIORITY"],
      queues: (ENV["QUEUES"] || ENV["QUEUE"] || "").split(","),
      quiet: false
    }.delete_if { |_k, v| v.nil? }

    worker = Worker.new(worker_options)

    puts "*** Starting DelayedJob worker in #{Rails.env} environment ***"

    worker.start
  end
end
