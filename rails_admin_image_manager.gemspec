$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "rails_admin_image_manager/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rails_admin_image_manager"
  s.version     = RailsAdminImageManager::VERSION
  s.authors     = ["iXmedia"]
  s.email       = ["info@ixmedia.com"]
  s.homepage    = ""
  s.summary     = "Image manager for RailsAdmin and CKEditor."
  s.description = "Image manager for RailsAdmin and CKEditor."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", ">= 5.0.2"
  s.add_dependency "rails_admin", ">= 1.1.1"
  s.add_dependency "ckeditor", ">= 4.2.3"
  s.add_dependency "paperclip", ">= 5.1.0"

  s.add_development_dependency "sqlite3"
end
