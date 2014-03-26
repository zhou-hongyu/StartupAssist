class CanvasController < ApplicationController
  def index
    @canvas = Canva.all
    respond_to do |format|
      format.html
      format.json { render json: @canvas }
    end
  end

  def new
    @canva = Canva.new
    respond_to do |format|
      format.html
      format.json { render json: @canva }
    end
  end

  def create
    
  end

  def show
  end

  def update
  end

  def destroy
  end
end
