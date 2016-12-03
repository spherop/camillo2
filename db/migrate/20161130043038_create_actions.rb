class CreateActions < ActiveRecord::Migration[5.0]
  def change
    create_table :actions do |t|
      t.string :title
      t.string :description
      t.text :notes
      t.integer :user_id
      t.datetime :action_date

      t.timestamps
    end
  end
end
