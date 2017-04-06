class Strength < Item
  belongs_to :user
  default_scope { where(item_type: "strength") }
end
