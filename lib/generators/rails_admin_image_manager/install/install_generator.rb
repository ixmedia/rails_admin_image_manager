require 'rails/generators'
module RailsAdminImageManager
  module Generators
    class InstallGenerator < Rails::Generators::Base

      # desc "Installs RailsAdminImageManager into your app. Get wealthy."

      def create_migrations
        rake "rails_admin_image_manager:install:migrations"
      end

      def configure_dynamic_paperclip
        generate "dynamic_paperclip:install"
      end

  end
 end
end
