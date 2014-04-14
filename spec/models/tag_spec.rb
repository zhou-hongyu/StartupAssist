require 'spec_helper'

describe Tag do
  describe 'association' do
    it {should belong_to :canva}
  end
end