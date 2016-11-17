class AddElementIdToPost < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :element_id, :integer
  end
end
