class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.float :x
      t.float :y
      t.string :color
      t.string :content
      t.integer :project_id

      t.timestamps
    end
  end
end
