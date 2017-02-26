class PostsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show, :timeline]
	before_action :get_elements, except: [:new, :edit]

	def index
		@posts = Post.all
		respond_to do |format|
	    format.html {
				
			}
	    format.json {
	      # render :json => @post.to_json
	    }
		end
	end
	
	def timeline
		@posts = Post.all
	end

	def new
		@post = Post.new
	end

	def show
		@post = Post.find(params[:id])
	end

	def create
		@post = current_user.posts.build(post_params)
		respond_to do |format|
	    format.html {
				if @post.save
					redirect_to @post
				else
					render 'new'
				end
			}
	    format.json {
				if @post.save
					render :json => @post.to_json
				else
					render :json => @post.errors
				end
	    }
		end
	end

	def edit
		@post = Post.find(params[:id])
	end

	def update
		@post = Post.find(params[:id])
		if @post.update(params[:post].permit(:title, :body, :element_id, :summary))
			redirect_to @post
		else
			render 'edit'
		end
	end

	def destroy
		@post = Post.find(params[:id])
		@post.destroy
		respond_to do |format|
	    format.html {
				redirect_to posts_path
			}
	    format.json {
				if @post.save
					render :json => @post.to_json # what should we render when successful?
				else
					render :json => @post.errors
				end
	    }
		end
	end
	
	def get_elements
		@elements ||= Element.all
	end

	private

	def post_params
		params.require(:post).permit(:title, :body, :element_id, :summary)
	end
end
