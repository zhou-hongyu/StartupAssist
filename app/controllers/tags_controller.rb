class TagsController < ApplicationController
  
  def create
    @tag = Tag.new(tag_params)
    render json: @tag
  end

  private

  def tag_params
    params.require(:tag).permit(:tag_id, :tag_class, :rect_class, :rect_height, :rect_onmousedown, :rect_style, :rect_transform, :rect_width, :rect_x, :rect_y, :txt_class, :txt_inner, :txt_onmousedown, :txt_style, :txt_transform, :txt_width, :txt_x, :txt_y)
  end
end