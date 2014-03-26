class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.text :properties
      t.references :canva, index: true

      t.timestamps
    end
  end
end
