defmodule BudgetAppWeb.BudgetController do
  use BudgetAppWeb, :controller

  alias BudgetApp.Helpers
  alias BudgetApp.Budget

  action_fallback BudgetAppWeb.FallbackController

  def index(conn, _params) do
    budgets = Helpers.list_budgets()
    render(conn, "index.json", budgets: budgets)
  end

  def create(conn, %{"budget" => budget_params}) do
    with {:ok, %Budget{} = budget} <- Helpers.create_budget(budget_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", budget_path(conn, :show, budget))
      |> render("show.json", budget: budget)
    end
  end

  def show(conn, %{"id" => id}) do
    budget = Helpers.get_budget!(id)
    render(conn, "show.json", budget: budget)
  end

  def update(conn, %{"id" => id, "budget" => budget_params}) do
    budget = Helpers.get_budget!(id)

    with {:ok, %Budget{} = budget} <- Helpers.update_budget(budget, budget_params) do
      render(conn, "show.json", budget: budget)
    end
  end

  def delete(conn, %{"id" => id}) do
    budget = Helpers.get_budget!(id)
    with {:ok, %Budget{}} <- Helpers.delete_budget(budget) do
      send_resp(conn, :no_content, "")
    end
  end
end
