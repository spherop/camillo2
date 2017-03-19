json.extract! source, :id, :title, :source_type, :subtitle, :year, :author, :summary, :publisher, :created_at, :updated_at
json.url source_url(source, format: :json)