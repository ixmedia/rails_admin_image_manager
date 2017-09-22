module RailsAdminImageManager
  class ImagesController < RailsAdminImageManager::ApplicationController

    def index
      respond_to do |format|
        format.html {
          @tags   = RailsAdminImageManager::Tag.with_files
        }

        format.json {
          images  = RailsAdminImageManager::File.select(:id, :name, :image_file_name, :created_at).order(:name).page(params[:page])
          images  = images.filter_by_text(params[:search]) if filter_by?(:search)
          images  = images.filter_by_tags(params[:tags].map{|i| i.to_i }) if filter_by?(:tags)
          images  = images.order_by_date(params[:date]) if filter_by?(:date)
          images  = images.order_by_title(params[:title]) if filter_by?(:title)

          images.each do |image|
            image.src = image.image.url(:index)
          end

          data    = { items: images, total_count: images.total_count, limit_value: images.limit_value }

          render json: data, methods: [:src, :tags_list], status: :ok
        }
      end
    end

    def tags
      respond_to do |format|
        format.json {
          tags = RailsAdminImageManager::Tag.with_files
          render json: tags, status: :ok
        }
      end
    end

    def new
      _check_permissions(:create)
      render json: {msg: 'ok'}, status: :ok
    end

    def show
      _check_permissions(:update)

      image                 = RailsAdminImageManager::File.select(:id, :name, :description, :copyright, :image_file_name).find_by!(id: params[:id])
      image.src             = image.image.url(:show)
      image.src_for_wysiwyg = {width: params[:width], height: params[:height]} if filter_by?(:width) && filter_by?(:height)

      render json: image, methods: [:src, :src_for_wysiwyg, :tags_list], status: :ok
    end

    def update
      _check_permissions(:update)

      my_params = images_params
      image = RailsAdminImageManager::File.find(my_params[:id])

      # Handling dynamic tag creating when receiving a string
      tags = []
      images_params[:tags].each do |tag_string|
       tags << RailsAdminImageManager::Tag.retrieve_or_create_tag(tag_string)
      end
      my_params[:tags] = tags

      # Updating image object
      if image.present? && image.update_attributes(my_params)
        render json: image, status: :ok
      else
        render json: image.errors, status: :unprocessable_entity
      end
    end

    def create
      _check_permissions(:create)

      my_params = images_params

      # Handling dynamic tag creating when receiving a string
      tags = []
      images_params[:tags].each do |tag_string|
       tags << RailsAdminImageManager::Tag.retrieve_or_create_tag(tag_string)
      end
      my_params[:tags] = tags

      image = RailsAdminImageManager::File.new(my_params)
      if image.save()
        render json: image, status: :ok
      else
        render json: image.errors, status: :unprocessable_entity
      end
    end

    def destroy
      _check_permissions(:destroy)

      image = RailsAdminImageManager::File.find(params[:id])
      if image.destroy
        render json: image, status: :ok
      else
        render json: image.errors, status: :unprocessable_entity
      end
    end

    def images_params
      params.require(:image).permit(:id, :name, :description, :copyright, :src, tags: [])
    end
  end
end
