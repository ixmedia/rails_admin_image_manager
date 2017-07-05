#require 'rails_admin/config/fields/types/string'
module RailsAdmin::Config::Fields::Types
  class ImageManagerPicker < RailsAdmin::Config::Fields::Base
    RailsAdmin::Config::Fields::Types::register(:image_manager_picker, self)

    register_instance_option(:config) do
      {}
    end

    register_instance_option(:partial) do
      :form_image_manager_picker
    end

    register_instance_option(:delete_method) do
      "#{name}_deselect"
    end

    register_instance_option :allowed_methods do
      [method_name, delete_method].compact
    end

    def editor_options
      RailsAdminImageManager.options(config)
    end

    def preview_image_path
      if value.to_s.html_safe != ""
        if (true if Float(value) rescue false)
          # if the value is numeric we assume its an object id
          # Check if the id exist otherwise show placeholder image
          if RailsAdminImageManager::File.exists?(value)
            image_manager_file = RailsAdminImageManager::File.find(value)
            image_manager_file.image.url(:small)
          else
            editor_options[:placeholder_image]
          end
        else
          # if not, we assume its a url
          value.to_s
        end
      else
        # no value, show placeholder image
        editor_options[:placeholder_image]
      end

    end

  end
end
