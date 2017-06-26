class CreateImageManager < ActiveRecord::Migration
  def change
    create_table :image_manager_files do |t|
      t.string      :name, null: false
      t.string      :image_file_name
      t.string      :image_content_type
      t.integer     :image_file_size
      t.datetime    :image_updated_at
      t.string      :type, limit: 30

      t.timestamps
    end

    add_index :image_manager_files, :type

    # ---------------------------------------------

    create_table :image_manager_tags do |t|
      t.string      :name, null: false

      t.timestamps
    end

    add_index :image_manager_tags,  :name, unique: true

    # ---------------------------------------------

    create_join_table :image_manager_files, :image_manager_tags do |t|
      t.integer       :image_manager_file_id
      t.integer       :image_manager_tag_id
    end

    execute "ALTER TABLE image_manager_files_tags ADD PRIMARY KEY (image_manager_file_id, image_manager_tag_id)"

    add_foreign_key :image_manager_files_tags, :image_manager_files,  on_update: :cascade, on_delete: :cascade
    add_foreign_key :image_manager_files_tags, :image_manager_tags,   on_update: :cascade, on_delete: :cascade
  end
end
