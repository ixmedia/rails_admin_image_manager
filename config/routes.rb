RailsAdminImageManager::Engine.routes.draw do

  root    'home#index'
  get     '/tags'       => 'images#tags',  as: 'image_manager_tag_index'
  get     '/images'     => 'images#index',  as: 'image_manager_index'
  get     '/images/new' => 'images#new'
  get     '/images/:id' => 'images#show'
  put     '/images'     => 'images#update'
  post    '/images'     => 'images#create'
  delete  '/images'     => 'images#destroy'

end
