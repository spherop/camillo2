json.extract! item, :id, :title, :notes, :item_type, :description, :created_at, :updated_at
json.url item_url(item, format: :json)