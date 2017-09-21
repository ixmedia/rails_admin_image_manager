module RailsAdminImageManager
  class ApplicationController < RailsAdmin::ApplicationController

    protect_from_forgery with: :exception

    before_action :_authenticate!
    before_action :_authorize!

   private

    def _authenticate!
      instance_eval(&RailsAdmin::Config.authenticate_with)
    end

    def _authorize!
      instance_eval(&RailsAdmin::Config.authorize_with)
    end

    def filter_by?(param)
      params[param].present?
    end

  end
end
