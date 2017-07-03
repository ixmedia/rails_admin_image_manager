module DynamicPaperclip
  class Attachment < Paperclip::Attachment
    def dynamic_url(definition)
      raise DynamicPaperclip::Errors::SecretNotSet, "No secret has been configured. Please run the dynamic_paperclip:install generator." unless DynamicPaperclip.config.secret.present?

      style_name = StyleNaming.dynamic_style_name_from_definition(definition)

      url = url(style_name)

      # iXmedia
      # Fix to avoid url with 2 "?" when timestamp is used in paperclip
      # Ex: "/system/rails_admin_image_manager/files/images/000/000/001/dynamic_10x10/test.jpg?1498751741?s=c3ac6269a728f8e9a8d625ef84455a082bdd3bbf
      # delimiter_char = url.match(/\?.+=/) ? '&' : '?'
      delimiter_char = url.match(/\?/) ? '&' : '?'

      "#{url}#{delimiter_char}s=#{UrlSecurity.generate_hash(style_name)}"
    end
  end
end

require 'action_dispatch/http/response.rb'

module DynamicPaperclip
  class AttachmentStyleGenerator

    def call(env)
      request = Rack::Request.new(env)

      DynamicPaperclip::AttachmentRegistry.each_definition do |klass, name, options|
        if match = regexp_for_attachment_url(klass, (options[:url] || Attachment.default_options[:url])).match(request.path)
          id = id_from_partition(match[:id])
          attachment = klass.find(id).send(name)

          # iXmedia
          # Fix to avoid error: uninitialized constant ActionController::DataStreaming::FileBody
          # When the filename is wrong
          # Return a 404 instead
          if attachment.original_filename != URI.unescape(match[:filename])
            return [404, {}, []]
          end

          # The definition will be escaped twice in the URL, so we need to unescape it once.
          # We should always reference dynamic style names after escaping once - that's how they reside on the FS.
          style_name = StyleNaming.dynamic_style_name_from_definition(CGI.unescape(match[:definition]), false)

          # Validate URL hash against requested style name
          if DynamicPaperclip::UrlSecurity.valid_hash?(request.params['s'], style_name)

            # Only process style if it doesn't exist,
            # otherwise we may just be fielding a request for
            # an existing style
            attachment.process_dynamic_style style_name unless attachment.exists?(style_name)

            return [
              200,
              {
                'Content-Type' => attachment.content_type,
                'Content-Transfer-Encoding' => 'binary',
                'Content-Disposition' => "inline; filename=#{File.basename(attachment.path(style_name))}"
              },
              ActionDispatch::Response::FileBody.new(attachment.path(style_name))
            ]
          else
            # Invalid hash, just 403

            return [403, {}, []]
          end
        end
      end

      @app.call env
    end

  end
end
