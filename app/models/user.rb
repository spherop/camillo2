class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :posts, :dependent => :nullify
  has_many :items, :dependent => :nullify
  has_many :ideas, :dependent => :nullify
  has_many :strengths, :dependent => :nullify
  has_many :excerpts, :dependent => :nullify
  has_many :sources, :dependent => :nullify
  
  has_many :creative_actions, :dependent => :nullify
  has_many :projects, :dependent => :nullify
  has_many :goals, :dependent => :nullify
  has_many :next_steps, :dependent => :nullify
  
  after_create :update_access_token!  


  private

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save
  end

  
end
