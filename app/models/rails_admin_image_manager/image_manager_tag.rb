module RailsAdminImageManager
  class ImageManagerTag < ApplicationRecord

    # == Extensions ===========================================================

    # == Constants ============================================================

    # == Attributes ===========================================================

    # == Callbacks ============================================================

    # == Relationships ========================================================

    # == Validations ==========================================================

    validates_presence_of :name

    validates_uniqueness_of :name

    # == Scopes ===============================================================

    # == Instance Methods =====================================================

    # == Class Methods ========================================================

    self.table_name = 'image_manager_tags'

  end
end
