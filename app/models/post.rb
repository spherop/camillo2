class Post < ApplicationRecord
  belongs_to :user
  # belongs_to :element
  # acts_as_taggable # Alias for acts_as_taggable_on :tags
  default_scope { order(created_at: "DESC") }
  before_create :set_defaults
  
  before_save :create_summary
  
  private 
  def set_defaults 
    title = "Untitled Post"
  end
  
  def create_summary
    return if !self.body or destroyed?
    stripped = ActionController::Base.helpers.strip_tags(self.body.gsub!('><', '> <'))
    if stripped
      self.summary = stripped.truncate(200) 
    elsif self.body
      self.summary = self.body.truncate(200)
    end
  end
end
