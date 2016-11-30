class Post < ApplicationRecord
  belongs_to :user
  belongs_to :element
  # acts_as_taggable # Alias for acts_as_taggable_on :tags
  default_scope { order(created_at: "DESC") }
end
