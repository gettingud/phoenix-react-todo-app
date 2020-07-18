defmodule Todo.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:categories) do
      add :title, :string, null: false

      timestamps()
    end

  end
end
