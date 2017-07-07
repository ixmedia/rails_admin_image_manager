module RailsAdminImageManager
  class HomeController < RailsAdminImageManager::ApplicationController

    def index
      redirect_to image_manager_index_path
    end
  end
end
