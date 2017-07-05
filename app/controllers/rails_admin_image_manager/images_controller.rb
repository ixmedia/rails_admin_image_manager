module RailsAdminImageManager
  class ImagesController < ApplicationController

    def index
    end

    def show
      image = {
        title: 'Ma vie en cinemascope',
        description: 'Une longue description',
        copyright: 'Un copyright',
        src: "https://unsplash.it/680/480",
        tags: ["un tag", "un autre tag", "another one"]
      }
      render json: image, status: :ok
    end
    def update
    end

    def create
    end

    def destroy
    end

  end
end
