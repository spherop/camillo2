class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :title
      t.string :description
      t.text :notes
      t.integer :user_id
      t.integer :item_type, default: 1
      t.datetime :due_date

      t.timestamps
    end
  end
end
