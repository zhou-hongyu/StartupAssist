class CreateUsersCanvasJoinTable < ActiveRecord::Migration
  def change
    create_join_table :users, :canvas do |t|
      t.index [:user_id, :canva_id]
      t.index [:canva_id, :user_id]
    end
  end
end
