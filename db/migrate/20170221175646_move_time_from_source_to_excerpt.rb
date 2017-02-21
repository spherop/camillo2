class MoveTimeFromSourceToExcerpt < ActiveRecord::Migration[5.0]
  def change
    remove_column :sources, :time
    add_column :excerpts, :time, :string, :default => "00:00"
  end
end
