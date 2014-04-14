require 'spec_helper'

describe User do
  describe 'association' do
    it {should have_and_belong_to_many :canvas}
  end

  describe 'validation' do
    it {should validate_presence_of(:email)}
    it {should validate_presence_of(:password)}
  end
end
