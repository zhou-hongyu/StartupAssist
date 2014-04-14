require 'spec_helper'

feature 'Manage a user' do
  before :each do
    @Joe = User.create(email: "joe@gmail.com", password: 'nevermore')
    @Ga = Canva.create(business_name: 'General Assembly')
    @Joe.canvas. << @Ga
  end

  scenario "a user should be able to sign up" do
    visit new_user_registration_path
    fill_in 'Email', with: 'joe@gmail.com'
    fill_in 'Password', with: 'nevermore'
    fill_in 'Password confirmation', with: 'nevermore'
    click_button 'Sign up'
  end
end