class Excerpt < ApplicationRecord
  belongs_to :source
  belongs_to :user
end
