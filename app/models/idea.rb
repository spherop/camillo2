class Idea < Item
  belongs_to :user
  default_scope { where(item_type: "idea") }
end
