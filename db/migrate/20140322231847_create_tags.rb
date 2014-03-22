class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.text :content
      t.references :category, index: true

      t.timestamps
    end
  end
end
