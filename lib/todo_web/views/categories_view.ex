defmodule TodoWeb.CategoriesView do
  use TodoWeb, :view

  alias TodoWeb.CategoriesView

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, CategoriesView, "category.json", as: :category)}
  end

  def render("category.json", %{category: category}) do
    %{id: category.id, title: category.title}
  end
end
