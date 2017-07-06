module RailsAdminImageManager
  class ImagesController < ApplicationController

    def index
    end

    def show
      image     = RailsAdminImageManager::File.select(:id, :name, :description, :copyright, :image_file_name).find_by!(id: params[:id])
      image.src = image.image.url(:show)

      render json: image, methods: [:src, :tags_list], status: :ok
    end

    def update
    end

    def create
      @foo = Model.new
      Model.save
      Model.errors
    end

    def destroy
    end

  end
end
