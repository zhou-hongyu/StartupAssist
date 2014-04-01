class CreateCanvas < ActiveRecord::Migration
  def change
    create_table :canvas do |t|
      t.string :business_name

      t.timestamps
    end
  end
end
