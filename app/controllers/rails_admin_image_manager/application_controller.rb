module RailsAdminImageManager
  class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception

    before_action :_authenticate!
    before_action :_authorize!
    before_action :_check_permissions

    def _current_user
      instance_eval(&RailsAdmin::Config.current_user_method)
    end

   private

    def _authenticate!
      instance_eval(&RailsAdmin::Config.authenticate_with)
    end

    def _authorize!
      instance_eval(&RailsAdmin::Config.authorize_with)
    end

    def _check_permissions(action=:read)
      model = RailsAdmin::AbstractModel.new(to_model_name("::RailsAdminImageManager::File"))
      @authorization_adapter.try(:authorize, action, model)
    end

    def to_model_name(param)
      param.split('~').collect(&:camelize).join('::')
    end

    def filter_by?(param)
      params[param].present?
    end

  end
end
