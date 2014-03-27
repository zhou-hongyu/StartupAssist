class CanvasController < ApplicationController
  def index
    @canvas = Canva.all
    respond_to do |format|
      format.html
      format.json { render json: @canvas }
    end
  end

  def new
  end

  def create
    @canva = Canva.new
    if user_signed_in?
      current_user.canvas << @canva
    end
    render json: current_user.canvas
  end

  def show
    @canva = Canva.find(params[:canva_id])

    render json: @canva.tags
  end

  def update
  end

  def destroy
  end

end
