RailsAdmin.config do |config|
  config.model RailsAdminImageManager::Tag do
    navigation_label I18n.t('admin.navigation_label.tag')

    list do
      field :name do
        filterable false
      end
    end

    edit do
      field :name
    end

    show do
      field :name
      field :created_at
      field :updated_at
    end

  end
end
