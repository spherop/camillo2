json.extract! post, :id, :title, :body, :summary, :created_at, :updated_at
json.url post_url(post, format: :json)