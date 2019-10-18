# https://github.com/thoughtbot/paperclip/issues/2575
Paperclip::DataUriAdapter.register if Paperclip::DataUriAdapter.respond_to?(:register)
