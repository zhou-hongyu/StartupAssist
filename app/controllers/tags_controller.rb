class TagsController < ApplicationController

  def create
    @canva = Canva.find(params[:canva_id])
    @tag = Tag.create!(params[:id])
    @canva.tags << @tag
    render json: @tag
  end

  def update
    @tag = Tag.find(params[:tag_id_int])
    @tag.update!(tag_params)
    render json: @tag
  end

  def destroy
    @tag = Tag.find(params[:tag_id])
    @tag.destroy

    render json: @tag
  end

  private

  def tag_params
    params.require(:tag).permit(:id, :tag_id, :tag_class, :rect_class, :rect_height, :rect_onmousedown, :rect_style, :rect_transform, :rect_width, :rect_x, :rect_y, :txt_class, :txt_inner, :txt_onmousedown, :txt_style, :txt_transform, :txt_width, :txt_x, :txt_y, :circle_cx, :circle_cy, :circle_transform)
  end
end