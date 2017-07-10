require "rails_admin_image_manager/rails_admin/config/fields/types/image_manager_picker"
require "rails_admin_image_manager/has_managed_file"
require "rails_admin_image_manager/engine"

module RailsAdminImageManager
  extend ActiveSupport::Autoload

  # configuration for picker
  mattr_accessor :placeholder_image
  @@placeholder_image = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" # a transparent pixel

  mattr_accessor :hidden_input
  @@hidden_input = true
  # end configuration for picker

  # Configuration defaults (these map directly to ckeditor settings)
  mattr_accessor :editor
  @@editor = {
    imageManagerBrowserUrl: '/admin/image_manager/',
  }
  # End configuration defaults

  mattr_accessor :paginates_per
  @@paginates_per = 15

  def self.options(overrides={})
    # merge in editor settings configured elsewhere

    base = {
      placeholder_image:  self.placeholder_image,
      hidden_input:       self.hidden_input,
      paginates_per:      self.paginates_per
    }
    editor_options = self.editor.merge(base)

    # merge in local overrides
    editor_options.merge!(overrides) if overrides

    editor_options
  end

end

ActiveSupport.on_load(:active_record) do
  extend RailsAdminImageManager::HasManagedFile
end
