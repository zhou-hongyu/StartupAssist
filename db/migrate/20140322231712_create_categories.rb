class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.references :canva, index: true

      t.timestamps
    end
  end
end
