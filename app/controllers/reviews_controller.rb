class ReviewsController < ApplicationController
  def create
    puts params
    review = Review.new(review_params)
    toilet = Toilet.find(params[:toilet])
    review.toilet = toilet
    if review.save!
      render json: { toilet: toilet }.to_json(include: %i[reviews photo_urls])
    else
      render json: { errors: review.errors }
    end
  end

  private

  def review_params
    params.require(:review).permit(:cleanliness_score, :content, :toilet_id)
  end
end
