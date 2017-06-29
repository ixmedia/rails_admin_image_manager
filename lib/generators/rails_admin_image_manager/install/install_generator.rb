require 'rails/generators'
module RailsAdminImageManager
  module Generators
    class InstallGenerator < Rails::Generators::Base

      # desc "Installs Rich into your app. Get wealthy."

      def setup_route
        route "mount RailsAdminImageManager::Engine => '/image-manager', :as => 'image_manager'"
      end

  end
 end
end
