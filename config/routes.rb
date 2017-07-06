RailsAdminImageManager::Engine.routes.draw do

  root "images#index"

  get '/images'    => 'images#index', as: 'image_manager_index'
  get '/images/:id'    => 'images#show'
  put '/images'    => 'images#update'
  post '/images'   => 'images#create'
  delete '/images' => 'images#destroy'

end
