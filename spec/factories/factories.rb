FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email}
    password 'nevermore'
  end

  factory :canva do
    user
    business_name 'GA'

  end
end