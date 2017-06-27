module RailsAdminImageManager
  class File < ApplicationRecord

    # == Extensions ===========================================================

    # == Constants ============================================================

    # == Attributes ===========================================================

    # == Callbacks ============================================================

    # == Relationships ========================================================

    has_and_belongs_to_many :tags, class_name: 'RailsAdminImageManager::Tag', join_table: 'image_manager_files_tags', foreign_key: :image_manager_file_id

    # == Validations ==========================================================

    validates_presence_of :name

    # == Scopes ===============================================================

    # == Instance Methods =====================================================

    # == Class Methods ========================================================

    self.table_name = 'image_manager_files'

  end
end
