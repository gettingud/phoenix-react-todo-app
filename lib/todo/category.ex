defmodule Todo.Category do
  use Ecto.Schema
  import Ecto.Changeset

  alias Todo.{Category, Repo}

  schema "categories" do
    field :title, :string

    timestamps()
  end

  def list() do
    Repo.all(Category)
  end

  @doc false
  def changeset(category, attrs) do
    category
    |> cast(attrs, [:title])
    |> validate_required([:title])
  end
end
