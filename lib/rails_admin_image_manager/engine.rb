require 'dynamic_paperclip'
require 'dynamic_paperclip_patch'

module RailsAdminImageManager
  class Engine < ::Rails::Engine
    isolate_namespace RailsAdminImageManager

    initializer :add_to_precompile do |app|
      app.config.assets.precompile += %w( rails_admin_image_manager/base.js.erb )
    end

    initializer :reload_rails_admin_configs do |app|
      Rails.application.config.to_prepare do
        RailsAdmin::ApplicationController.class_eval do
          before_action :reload_rails_admin_image_manager, if: :reload_rails_image_manager? # Reloading RailsAdmin Config Automatically

          def reload_rails_admin_image_manager
            gem_dir = Gem::Specification.find_by_name("rails_admin_image_manager").gem_dir

            Dir.foreach("#{gem_dir}/config/initializers/rails_admin") do |item|
              next if item == '.' or item == '..'
              load("#{gem_dir}/config/initializers/rails_admin/#{item}")
            end
          end

          def reload_rails_image_manager?
            Rails.env.development?
          end
        end
      end
    end

  end
end
