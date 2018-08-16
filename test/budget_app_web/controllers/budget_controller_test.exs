defmodule BudgetAppWeb.BudgetControllerTest do
  use BudgetAppWeb.ConnCase

  alias BudgetApp.Example
  alias BudgetApp.Example.Budget

  @create_attrs %{amount: 42, category: "some category", name: "some name"}
  @update_attrs %{amount: 43, category: "some updated category", name: "some updated name"}
  @invalid_attrs %{amount: nil, category: nil, name: nil}

  def fixture(:budget) do
    {:ok, budget} = Example.create_budget(@create_attrs)
    budget
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all budgets", %{conn: conn} do
      conn = get conn, budget_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create budget" do
    test "renders budget when data is valid", %{conn: conn} do
      conn = post conn, budget_path(conn, :create), budget: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, budget_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 42,
        "category" => "some category",
        "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, budget_path(conn, :create), budget: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update budget" do
    setup [:create_budget]

    test "renders budget when data is valid", %{conn: conn, budget: %Budget{id: id} = budget} do
      conn = put conn, budget_path(conn, :update, budget), budget: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, budget_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "amount" => 43,
        "category" => "some updated category",
        "name" => "some updated name"}
    end

    test "renders errors when data is invalid", %{conn: conn, budget: budget} do
      conn = put conn, budget_path(conn, :update, budget), budget: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete budget" do
    setup [:create_budget]

    test "deletes chosen budget", %{conn: conn, budget: budget} do
      conn = delete conn, budget_path(conn, :delete, budget)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, budget_path(conn, :show, budget)
      end
    end
  end

  defp create_budget(_) do
    budget = fixture(:budget)
    {:ok, budget: budget}
  end
end
