class CreativeAction < Item
  belongs_to :user
  default_scope { where(item_type: "creative_action") }
end
