json.extract! next_step, :id, :title, :description, :notes, :user_id, :due_date, :created_at, :updated_at
json.url next_step_url(next_step, format: :json)