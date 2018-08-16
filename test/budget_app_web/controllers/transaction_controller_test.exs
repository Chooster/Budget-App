defmodule BudgetAppWeb.TransactionControllerTest do
  use BudgetAppWeb.ConnCase

  alias BudgetApp.Example
  alias BudgetApp.Example.Transaction

  @create_attrs %{amount: 42, budget_id: 42, budget_name: "some budget_name", category: "some category", user: "some user"}
  @update_attrs %{amount: 43, budget_id: 43, budget_name: "some updated budget_name", category: "some updated category", user: "some updated user"}
  @invalid_attrs %{amount: nil, budget_id: nil, budget_name: nil, category: nil, user: nil}

  def fixture(:transaction) do
    {:ok, transaction} = Example.create_transaction(@create_attrs)
    transaction
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all transactions", %{conn: conn} do
      conn = get conn, transaction_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create transaction" do
    test "renders transaction when data is valid", %{conn: conn} do
      conn = post conn, transaction_path(conn, :create), transaction: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, transaction_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 42,
        "budget_id" => 42,
        "budget_name" => "some budget_name",
        "category" => "some category",
        "user" => "some user"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, transaction_path(conn, :create), transaction: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update transaction" do
    setup [:create_transaction]

    test "renders transaction when data is valid", %{conn: conn, transaction: %Transaction{id: id} = transaction} do
      conn = put conn, transaction_path(conn, :update, transaction), transaction: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, transaction_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 43,
        "budget_id" => 43,
        "budget_name" => "some updated budget_name",
        "category" => "some updated category",
        "user" => "some updated user"}
    end

    test "renders errors when data is invalid", %{conn: conn, transaction: transaction} do
      conn = put conn, transaction_path(conn, :update, transaction), transaction: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete transaction" do
    setup [:create_transaction]

    test "deletes chosen transaction", %{conn: conn, transaction: transaction} do
      conn = delete conn, transaction_path(conn, :delete, transaction)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, transaction_path(conn, :show, transaction)
      end
    end
  end

  defp create_transaction(_) do
    transaction = fixture(:transaction)
    {:ok, transaction: transaction}
  end
end
