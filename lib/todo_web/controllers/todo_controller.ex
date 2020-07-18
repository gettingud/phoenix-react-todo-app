defmodule TodoWeb.TodoController do
  use TodoWeb, :controller

  action_fallback TodoWeb.FallbackController

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
