RailsAdmin.config do |config|
  config.model RailsAdminImageManager::File do
    navigation_label I18n.t('admin.navigation_label.file')

    list do
      field :name do
        searchable true
        filterable false
      end

      field :description do
        visible false
        searchable true
        filterable false
      end

      field :image do
        thumb_method :rails_admin
        searchable true
        filterable false
      end

      field :image_file_name do
        visible false
        searchable true
        filterable false
      end

      field :tags do
        label I18n.t('activerecord.models.rails_admin_image_manager/tag.other')
        searchable [{image_manager_tags: :name}]
        queryable true
        #filterable false
        filterable true
      end

      # This filter has been commented because there is a bug in Rails Admin when using an enum filterable
      # and a custom searchable param. The search field is treated has a string instead has an enum,
      # which cause RailsAdmin to crash with the following error when selecting multiple tags:
      # undefined method `downcase' for ["27", "24"]:Array
      # rails_admin (1.1.1) lib/rails_admin/adapters/active_record.rb:229:in `build_statement_for_string_or_text'
      #
      # field :image_manager_tag_id, :enum do
      #   label I18n.t('activerecord.models.rails_admin_image_manager/tag.other')
      #   visible false
      #   enum do
      #     RailsAdminImageManager::Tag.all.order(:name).map { |c| [c.name, c.id] }
      #   end
      #   searchable [{image_manager_tags: :id}]
      #   filterable true
      # end
    end

    edit do
      field :url do
        read_only true
        help ''
        visible do
          bindings[:object].id.present?
        end
        pretty_value do
          "<a href='#{bindings[:object].image.url}' target='_blank'>#{bindings[:object].image.url}</a>".html_safe
        end
      end
      field :name
      field :image do
        thumb_method :show
      end
      field :description
      field :copyright
      field :tags
    end

    show do
      field :name
      field :image do
        thumb_method :show
      end
      field :tags
      field :created_at
      field :updated_at
    end

  end
end
