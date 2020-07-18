defmodule TodoWeb.FallbackController do
  use TodoWeb, :controller

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(TodoWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(TodoWeb.ChangesetView, "error.json", changeset: changeset)
  end
end
