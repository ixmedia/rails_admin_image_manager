RailsAdminImageManager::Engine.routes.draw do
  root "images#index"
  get 'foo' => 'images#index', as: 'images_index'
end
