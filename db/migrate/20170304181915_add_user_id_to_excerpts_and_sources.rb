class AddUserIdToExcerptsAndSources < ActiveRecord::Migration[5.0]
  def change
    add_column :excerpts, :user_id, :integer
    add_column :sources, :user_id, :integer
  end
end
