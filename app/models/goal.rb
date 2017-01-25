class Goal < ApplicationRecord
  default_scope { order(created_at: :desc) }
end
