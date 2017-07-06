require 'kaminari'

module RailsAdminImageManager
  class File < ApplicationRecord

    # == Extensions ===========================================================

    paginates_per RailsAdminImageManager.options[:paginates_per]

    # == Constants ============================================================

    # == Attributes ===========================================================

    has_dynamic_attached_file :image, styles: { show: '680x480', index: '250x250#', rails_admin: '75x75' }

    attr_accessor :src

    # == Callbacks ============================================================

    # == Relationships ========================================================

    has_and_belongs_to_many :tags, class_name: 'RailsAdminImageManager::Tag', join_table: 'image_manager_files_tags', foreign_key: :image_manager_file_id, association_foreign_key: :image_manager_tag_id

    # == Validations ==========================================================

    validates_presence_of :name

    validates_attachment  :image, presence: true, content_type: { content_type: /\Aimage\/.*\Z/ }

    # == Scopes ===============================================================

    scope :filter_by_text, -> (text) { where("image_manager_files.name LIKE ? OR image_manager_files.description LIKE ?", "%#{text}%", "%#{text}%") }
    scope :filter_by_tags, -> (tags) { joins(:tags).where('image_manager_files_tags.image_manager_tag_id IN (?)', tags).distinct }

    # == Instance Methods =====================================================

    # To avoid the 500 error when the foreign key constraint fails
    def destroy
      begin
        super
      rescue
        return false
      end
    end

    def tags_list
      tags.collect { |t| t.name }
    end

    # == Class Methods ========================================================

    self.table_name = 'image_manager_files'

  end
end
