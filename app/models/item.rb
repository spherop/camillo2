class Item < ApplicationRecord
  
  ITEM_TYPES = :creative_action, :goal, :idea, :post, :project, :question, :next_step # { "creative_action" => 0, "goal" => 1, "idea" => 2, "next_step" => 3, "post" => 4, "project" => 5, "question"=> 6 }
  enum item_type: ITEM_TYPES # { "creative_action" => 0, "goal" => 1, "idea" => 2, "next_step" => 3, "post" => 4, "project" => 5, "question"=> 6 }
  belongs_to :user
  before_save :create_description
  default_scope { order(created_at: :desc) }
  
  def create_description
    return if !self.notes
    stripped = ActionController::Base.helpers.strip_tags(self.notes.gsub!('><', '> <'))
    if stripped
      self.description = stripped.truncate(200) 
    elsif self.notes
      self.description = self.notes.truncate(200)
    end
  end
end
