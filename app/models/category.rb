class Category < ActiveRecord::Base
  belongs_to :canva
  has_many :tags
end