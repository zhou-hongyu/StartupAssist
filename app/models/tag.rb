class Tag < ActiveRecord::Base
  belongs_to :canva

  store_accessor :properties, :tag_id, :tag_class, :rect_class, :rect_height, :rect_onmousedown, :rect_style, :rect_transform, :rect_width, :rect_x, :rect_y, :txt_class, :txt_inner, :txt_onmousedown, :txt_style, :txt_transform, :txt_width, :txt_x, :txt_y
  serialize :properties, JSON
end