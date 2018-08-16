defmodule BudgetAppWeb.BudgetView do
  use BudgetAppWeb, :view
  alias BudgetAppWeb.BudgetView

  def render("index.json", %{budgets: budgets}) do
    %{data: render_many(budgets, BudgetView, "budget.json")}
  end

  def render("show.json", %{budget: budget}) do
    %{data: render_one(budget, BudgetView, "budget.json")}
  end

  def render("budget.json", %{budget: budget}) do
    %{id: budget.id,
      name: budget.name,
      amount: budget.amount,
      category: budget.category}
  end
end
