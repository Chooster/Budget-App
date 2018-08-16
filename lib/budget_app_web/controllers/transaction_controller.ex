defmodule BudgetAppWeb.TransactionController do
  use BudgetAppWeb, :controller

  alias BudgetApp.TransactionHelper
  alias BudgetApp.Transaction

  action_fallback BudgetAppWeb.FallbackController

  def index(conn, _params) do
    transactions = TransactionHelper.list_transactions()
    render(conn, "index.json", transactions: transactions)
  end

  def create(conn, %{"transaction" => transaction_params}) do
    with {:ok, %Transaction{} = transaction} <- TransactionHelper.create_transaction(transaction_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", transaction_path(conn, :show, transaction))
      |> render("show.json", transaction: transaction)
    end
  end

  def show(conn, %{"id" => id}) do
    transaction = TransactionHelper.get_transaction!(id)
    render(conn, "show.json", transaction: transaction)
  end

  def update(conn, %{"id" => id, "transaction" => transaction_params}) do
    transaction = TransactionHelper.get_transaction!(id)

    with {:ok, %Transaction{} = transaction} <- TransactionHelper.update_transaction(transaction, transaction_params) do
      render(conn, "show.json", transaction: transaction)
    end
  end

  def delete(conn, %{"id" => id}) do
    transaction = TransactionHelper.get_transaction!(id)
    with {:ok, %Transaction{}} <- TransactionHelper.delete_transaction(transaction) do
      send_resp(conn, :no_content, "")
    end
  end
end
