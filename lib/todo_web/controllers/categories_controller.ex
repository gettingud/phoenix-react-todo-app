defmodule TodoWeb.CategoriesController do
  use TodoWeb, :controller

  alias Todo.Category

  action_fallback TodoWeb.FallbackController

  def index(conn, _params) do
    categories = Category.list()
    render(conn, "index.json", categories: categories)
  end
end
