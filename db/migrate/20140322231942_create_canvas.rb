class CreateCanvas < ActiveRecord::Migration
  def change
    create_table :canvas do |t|
      t.string :business_name
      t.references :user, index: true

      t.timestamps
    end
  end
end
