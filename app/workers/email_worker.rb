class EmailWorker
  @queue = :default
  def self.perform(user_id)
    @user = User.find(user_id)
    Pony.mail(to: @user.email, subject: "Thank you for using Startup Assist!", body: "Welcome!")
  end
end