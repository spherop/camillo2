class CreateExcerpts < ActiveRecord::Migration[5.0]
  def change
    create_table :excerpts do |t|
      t.text :full_text
      t.text :short_text
      t.belongs_to :book, foreign_key: true
      t.integer :page_number
      t.text :commentary

      t.timestamps
    end
  end
end
