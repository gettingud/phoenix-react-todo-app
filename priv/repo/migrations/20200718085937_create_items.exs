defmodule Todo.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :label, :string, null: false
      add :done, :boolean, default: false, null: false
      add :important, :boolean, default: false, null: false
      add :category_id, references(:categories, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:items, [:category_id])
    create unique_index(:items, [:label, :category_id])
  end
end
