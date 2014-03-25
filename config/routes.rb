StartupAssist::Application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations", :sessions => "sessions" }
  root 'welcome#index'

  resources :canvas do
    resources :categories do
      resources :tags
    end
  end
end
