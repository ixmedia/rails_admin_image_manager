RailsAdminImageManager::Engine.routes.draw do
  root "images#index"
  get 'foo', to: 'images#index', as: 'images_index'
end

Rails.application.routes.draw do
  mount RailsAdminImageManager::Engine => '/image-manager', as: 'image_manager'
end
