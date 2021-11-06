class ApplicationController < ActionController::API
  def index
    render text: 'Hello', content_type: 'text/plain'
  end
end
