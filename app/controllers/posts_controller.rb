class PostsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]
	before_action :get_elements, except: [:new, :edit]

	def index
		# @element = params[:element]
		# element_id = Element.find_by_name(@element)
		# if element_id
		# 	@posts = Post.where(:element_id => element_id).order('created_at DESC')
		# else 
		# 	@post = Post.first
		# end
		# @post = Post.first
		
		respond_to do |format|
	    format.html {
				@posts = Post.all
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
		# @element = @post.element ? @post.element.name : ""
	end

	def create
		@post = current_user.posts.build(post_params)
		if @post.save
			redirect_to @post
		else
			render 'new'
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
		redirect_to posts_path
	end
	
	def get_elements
		@elements ||= Element.all
	end

	private

	def post_params
		params.require(:post).permit(:title, :body, :element_id, :summary)
	end
end
