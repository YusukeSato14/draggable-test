class Project < ApplicationRecord
  belongs_to :membership
  accepts_nested_attributes_for :membership
  has_many :cards
  accepts_nested_attributes_for :cards
end
