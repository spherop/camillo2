class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :posts, :dependent => :nullify
  has_many :ideas, :dependent => :nullify
  has_many :creative_actions, :dependent => :nullify
  has_many :projects, :dependent => :nullify
  has_many :goals, :dependent => :nullify
  has_many :next_steps, :dependent => :nullify
  
end
