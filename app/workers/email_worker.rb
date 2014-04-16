class EmailWorker
  @queue = :default
  def self.perform(user_id)
    @user = User.find(user_id)
    Pony.mail(to: @user.email, subject: "Thank you for using Startup Assist!", body: "Welcome to Startup Assist!")
  end

  def self.welcome(user_id)
    @user = User.find(user_id)
    Pony.mail(to: @user.email, subject: "Welcome Back!", body: "Welcome back! If you have any questions please contact: zhou.hongyu8976@gmail.com")
  end
end