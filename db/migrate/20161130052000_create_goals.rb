class CreateGoals < ActiveRecord::Migration[5.0]
  def change
    create_table :goals do |t|
      t.string :title
      t.string :description
      t.text :notes
      t.integer :user_id
      t.timestamps
    end
  end
end
