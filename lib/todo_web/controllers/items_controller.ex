defmodule TodoWeb.ItemsController do
  use TodoWeb, :controller

  alias Todo.Item

  action_fallback TodoWeb.FallbackController

  def index(conn, _params) do
    items = Item.list()
    render(conn, "index.json", items: items)
  end

  def create(conn, %{"item" => item_params}) do
    with {:ok, %Item{} = item} <- Item.create(item_params) do
      conn
      |> put_status(:created)
      |> render("show.json", item: item)
    end
  end

  def update(conn, %{"id" => id, "item" => item_params}) do
    item = Item.get!(id)

    with {:ok, %Item{} = item} <- Item.update(item, item_params) do
      render(conn, "show.json", item: item)
    end
  end

  def delete(conn, %{"id" => id}) do
    item = Item.get!(id)

    with {:ok, %Item{}} <- Item.delete(item) do
      send_resp(conn, :no_content, "")
    end
  end
end
