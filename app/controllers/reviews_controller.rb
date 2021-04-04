class ReviewsController < ApplicationController

    def create
        puts params
        review = Review.new(review_params)
        toilet = Toilet.find(params[:toilet])
        review.toilet = toilet
        review.save!
    end
    private

    def review_params
        params.require(:review).permit(:cleanliness_score, :content, :toilet_id)
    end


end
