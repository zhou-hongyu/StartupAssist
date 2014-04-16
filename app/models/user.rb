class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :canvas
  after_commit :say_hi, on: :create
  after_commit :say_hi_again, on: :update

  def say_hi
    EmailWorker.perform(self).deliver
  end

  def say_hi_again
    EmailWorker.welcome(self).deliver
  end
end
