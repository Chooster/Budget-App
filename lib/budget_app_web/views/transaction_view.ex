defmodule BudgetAppWeb.TransactionView do
  use BudgetAppWeb, :view
  alias BudgetAppWeb.TransactionView

  def render("index.json", %{transactions: transactions}) do
    %{data: render_many(transactions, TransactionView, "transaction.json")}
  end

  def render("show.json", %{transaction: transaction}) do
    %{data: render_one(transaction, TransactionView, "transaction.json")}
  end

  def render("transaction.json", %{transaction: transaction}) do
    %{id: transaction.id,
      budget_id: transaction.budget_id,
      budget_name: transaction.budget_name,
      amount: transaction.amount,
      user: transaction.user,
      category: transaction.category}
  end
end
