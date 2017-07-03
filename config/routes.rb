RailsAdminImageManager::Engine.routes.draw do
  root "images#index"
  get 'foo', to: 'images#index', as: 'images_index'
end
