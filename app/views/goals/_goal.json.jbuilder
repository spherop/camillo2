json.extract! goal, :id, :title, :description, :notes, :item_type, :user_id, :created_at, :updated_at
json.url goal_url(goal, format: :json)