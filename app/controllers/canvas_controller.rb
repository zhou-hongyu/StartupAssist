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
    @canva = Canva.create!(params[:id])
    @canva.save
    if user_signed_in?
      current_user.canvas << @canva
    end
    render json: @canva
  end

  def show
    @canva = Canva.find(params[:canva_id])

    render json: @canva.tags
  end

  def update
    # @canva = Canva.find(params[:canva_id])
    # current_user.canvas.each do |canva|
    #   if canva.id == @canva.id
    #     current_user.canvas.delete_at(a.index(canva))
    #     current_user << @canva.id
    #   end
    # end

    # render json: current_user.canvas
  end

  def destroy
  end

end
