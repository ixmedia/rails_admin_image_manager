module RailsAdminImageManager
  class Tag < ApplicationRecord

    # == Extensions ===========================================================

    # == Constants ============================================================

    # == Attributes ===========================================================

    # == Callbacks ============================================================

    # == Relationships ========================================================

    has_and_belongs_to_many :files, class_name: 'RailsAdminImageManager::File', join_table: 'image_manager_files_tags', foreign_key: :image_manager_tag_id, association_foreign_key: :image_manager_file_id

    # == Validations ==========================================================

    validates_presence_of :name

    validates_uniqueness_of :name

    # == Scopes ===============================================================

    scope :with_files, -> { joins(:files).distinct }

    # == Instance Methods =====================================================

    # == Class Methods ========================================================

    self.table_name = 'image_manager_tags'

  end
end
