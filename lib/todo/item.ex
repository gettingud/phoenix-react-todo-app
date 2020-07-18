defmodule Todo.Item do
  use Ecto.Schema
  import Ecto.Changeset

  alias Todo.{Item, Category, Repo}

  schema "items" do
    field :done, :boolean, default: false
    field :important, :boolean, default: false
    field :label, :string
    belongs_to :category, Category

    timestamps()
  end

  def list(), do: Repo.all(Item)

  def get!(id), do: Repo.get!(Item, id)

  def delete(%Item{} = item), do: Repo.delete(item)

  def create(attrs \\ %{}) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end

  def update(%Item{} = item, attrs) do
    item
    |> Item.changeset(attrs)
    |> Repo.update()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:label, :done, :important, :category_id])
    |> validate_required([:label, :done, :important])
    |> cast_assoc(:category, with: &Category.changeset/2)
    |> assoc_constraint(:category)
  end
end
