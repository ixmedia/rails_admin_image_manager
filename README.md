# RailsAdmin_ImageManager
Image manager for RailsAdmin and CKEditor.

## Installation
1. Add this line to your application's Gemfile:

```ruby
gem 'rails_admin_image_manager'
```

2. Run
```bash
$ bundle install
```

3. Install RailsAdmin_ImageManager
```bash
$ rails generate rails_admin_image_manager:install
```

4. Run migrations
```bash
$ rails db:migrate SCOPE=rails_admin_image_manager
```

## Configuration

1. The `mount RailsAdminImageManager::Engine` route must appear before the `mount RailsAdmin::Engine` route in the app routes.rb file.

2. If you need to explicitly specified the Files and Tags sections in RailsAdmin:
```ruby
RailsAdmin.config do |config|
  config.actions do
    index do
      only ['RailsAdminImageManager::Tag', 'RailsAdminImageManager::File']
    end
  end
end
```

## Authentication and authorization

The gem uses the RailsAdmin authentication and authorization methods.

- https://github.com/sferik/rails_admin/wiki/Authentication
- https://github.com/sferik/rails_admin/wiki/Authorization

## Development

### Assets
When developping for the gem, assets need to be watch/compile. We are running a webpack/gulp setup ; to run it, just `npm run start` at gem's root

## Authors
- Mario Bouchard
- Louis-Philippe Dumas

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
