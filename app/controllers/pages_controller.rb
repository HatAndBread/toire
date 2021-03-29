class PagesController < ApplicationController
    skip_before_action :authenticate_user!, only: :home
    def home
        @api_data = ENV['MAPBOX_KEY']
    end
end
