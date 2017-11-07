module RailsAdminImageManager
  module HasManagedFile

    def has_managed_file(attribute, id, options={})
      var_options_name = "@has_managed_file_#{attribute}_options"
      var_options_value = instance_variable_get(var_options_name)

      # If the same attribute is passed twice, we'll skip it
      if var_options_value.nil?
        instance_variable_set(var_options_name, options)

        add_managed_file_belongs_to(attribute)
        add_managed_file_validates_presence_of(id) if managed_file_options_mandatory(options)
        add_managed_file_before_validation(attribute, id) unless managed_file_options_mandatory(options)
      end
    end

    def managed_file_is_mandatory?(attribute)
      validators_on(attribute).any?{|validator| validator.kind_of?(ActiveModel::Validations::PresenceValidator)}
    end

   private

    def managed_file_options_mandatory(options)
      options.key?(:mandatory) && options[:mandatory] == true ? true : false
    end

    def add_managed_file_belongs_to(attribute)
      belongs_to attribute, class_name: "RailsAdminImageManager::File"
    end

    def add_managed_file_validates_presence_of(id)
      validates_presence_of id
    end

    def add_managed_file_before_validation(attribute, id)
      attr_accessor "#{id}_deselect"

      define_method "#{id}_deselect=" do |val|
        attribute_will_change!("#{id}_deselect") if val == '1'
        instance_variable_set("@#{id}_deselect", val)
      end

      before_validation { send("#{attribute}=", nil) if send("#{id}_deselect") == '1' }
    end
  end
end
