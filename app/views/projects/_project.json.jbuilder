json.extract! project, :id, :title, :description, :notes, :user_id, :created_at, :updated_at
json.url project_url(project, format: :json)