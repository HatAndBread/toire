Rails.application.routes.draw do

  root to: "pages#home"
  post '/toilets_near_me', to: "toilets#toilets_near_me"
  post '/reviews', to: "reviews#create"

end
