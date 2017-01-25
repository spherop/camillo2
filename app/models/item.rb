class Item < ApplicationRecord
  before_save 
  enum item_type: { "creative_action" => 0, "goal" => 1, "idea" => 2, "next_step" => 3, "post" => 4, "project" => 5, "question"=> 6 }
  belongs_to :user
  before_save :create_description
  
  
  def create_description
    stripped = ActionController::Base.helpers.strip_tags(self.notes.gsub!('><', '> <'))
    self.description = stripped.truncate(200)
  end
end
