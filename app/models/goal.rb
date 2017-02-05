class Goal < Item
  belongs_to :user
  default_scope { where(item_type: "goal") }
end
