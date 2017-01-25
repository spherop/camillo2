class Idea < Item
  belongs_to :user
  # before_save :create_description
  # 
  # 
  # def create_description
  #   description = truncate(strip_tags(notes), 200)
  # end
  
  
end
