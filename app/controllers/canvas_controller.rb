class CanvasController < ApplicationController
  def index
    @canvas = current_user.canvas

    respond_to do |format|
      format.json { render json: @canvas }
      format.html
    end
  end

  def create
    @canva = Canva.create!(canva_params)
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
    @user = User.where(:email => params[:contributor])[0]
    @canva = Canva.find(params[:canva_id])
    @user.canvas << @canva
    render json: @user
  end



  private

  def canva_params
    params.require(:canva).permit(:id, :business_name)
  end

end
