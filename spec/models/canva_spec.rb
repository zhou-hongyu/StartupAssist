require 'spec_helper'

describe Canva do
  describe 'association' do
    it {should have_and_belong_to_many :users}
    it {should have_many :tags}

  end

end