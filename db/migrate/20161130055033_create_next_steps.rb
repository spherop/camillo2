class CreateNextSteps < ActiveRecord::Migration[5.0]
  def change
    create_table :next_steps do |t|
      t.string :title
      t.string :description
      t.text :notes
      t.integer :user_id
      t.datetime :due_date

      t.timestamps
    end
  end
end
