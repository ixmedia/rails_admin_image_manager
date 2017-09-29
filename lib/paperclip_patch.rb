# We will replace every underscores (_) in the filename for a hyphen (-)
# This must be done in a patch because Paperclip has hardcoded that all :restricted_characters
# will be replaced by an underscore in the FilenameCleaner class: https://github.com/thoughtbot/paperclip/blob/master/lib/paperclip/filename_cleaner.rb
# For this reason, we can't add the underscore char to the :restricted_characters config.

module Paperclip
  class FilenameCleaner
    def call(filename)
      # Dirty hack to keep the dot in the filename (it's removed by the parameterize function)
      placeholder = '-p-l-a-c-e-h-o-l-d-e-r-'
      filename.sub!('.', placeholder)
      filename = filename.parameterize()
      filename.sub!(placeholder, '.')

      if @invalid_character_regex
        filename = filename.gsub(@invalid_character_regex, "_").gsub("_", "-")
      else
        filename
      end
    end
  end
end
