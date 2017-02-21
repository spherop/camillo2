class UpdateExcerpt < ActiveRecord::Migration[5.0]
  def change
    rename_column :excerpts, :book_id, :source_id
  end
end
