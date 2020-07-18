defmodule TodoWeb.ItemsView do
  use TodoWeb, :view

  alias TodoWeb.ItemsView

  def render("index.json", %{items: items}) do
    %{data: render_many(items, ItemsView, "item.json", as: :item)}
  end

  def render("show.json", %{item: item}) do
    %{data: render_one(item, ItemsView, "item.json", as: :item)}
  end

  def render("item.json", %{item: item}) do
    %{id: item.id, label: item.label, important: item.important, done: item.done}
  end
end
