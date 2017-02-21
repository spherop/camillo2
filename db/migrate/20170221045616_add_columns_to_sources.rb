class AddColumnsToSources < ActiveRecord::Migration[5.0]
  def change
    rename_table :books, :sources
    add_column :sources, :source_type, :string, :default => ""
    add_column :sources, :time, :string, :default => "00:00"
  end
end
