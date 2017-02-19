json.extract! book, :id, :title, :subtitle, :year, :author, :summary, :publisher, :created_at, :updated_at
json.url book_url(book, format: :json)