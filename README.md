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

4. Add the upload filepath to your .gitignore file
```
/public/rails_admin_image_manager
```

5. Run migrations
```bash
$ rails db:migrate SCOPE=rails_admin_image_manager
```

6. Install the image manager CKEditor plugin
```bash
touch app/assets/javascripts/ckeditor/config.js.erb
echo "//= require 'rails_admin_image_manager/ckeditor_plugin'" | cat - app/assets/javascripts/ckeditor/config.js.erb > temp && mv temp app/assets/javascripts/ckeditor/config.js.erb
```

7. If you need to add the image manager button in a custom CKEditor config
```js
CKEDITOR.editorConfig = function( config )
{
  config.toolbar =  [
    [ 'Styles', 'Bold', 'Italic', 'Underline' ],
    [ 'imageManager']
  ];
}
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

## Usage

Create the image foreign key in your db:

```ruby
class CreateImageForeignKey < ActiveRecord::Migration[5.0]
  def change
    change_table :mymodel do |t|
      t.integer :image_manager_file_id
    end
    add_foreign_key :mymodel, :image_manager_files, on_update: :cascade, on_delete: :restrict
  end
end
```

Add the image relationship to your model:

```ruby
class Mymodel < ApplicationRecord
  # has_managed_file :attribute_name, :attribute_id, :options
  has_managed_file :image_manager_file, :image_manager_file_id, mandatory: false
end
```

Add the image picker in RailsAdmin:

```ruby
config.model Mymodel do
  edit do
    field :image_manager_file_id, :image_manager_picker do
      config({
        hidden_input: true,
        paginates_per: 10
      }) # Optionnal
    end
  end
end
```

To display the image in a Rails template:

```html
<img src="<%= image_url @mymodel.image_manager_file.dynamic_url('100x100') %>">
```

## Development

### Assets
When developping for the gem, assets need to be watch/compile. We are running a webpack/gulp setup ; to run it, just `npm run start` at gem's root

## Authors
- Mario Bouchard
- Louis-Philippe Dumas

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
