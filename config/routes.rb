StartupAssist::Application.routes.draw do
  devise_for :users
  root 'welcome#index'

  resources :canvas do
    resources :categories do
      resources :tags
    end
  end
end
