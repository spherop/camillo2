class CreateSources < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :subtitle
      t.integer :year
      t.string :author
      t.text :summary
      t.string :publisher

      t.timestamps
    end
  end
end
