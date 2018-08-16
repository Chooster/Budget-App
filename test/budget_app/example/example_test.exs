defmodule BudgetApp.ExampleTest do
  use BudgetApp.DataCase

  alias BudgetApp.Example

  describe "budgets" do
    alias BudgetApp.Example.Budget

    @valid_attrs %{amount: 42, category: "some category", name: "some name"}
    @update_attrs %{amount: 43, category: "some updated category", name: "some updated name"}
    @invalid_attrs %{amount: nil, category: nil, name: nil}

    def budget_fixture(attrs \\ %{}) do
      {:ok, budget} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Example.create_budget()

      budget
    end

    test "list_budgets/0 returns all budgets" do
      budget = budget_fixture()
      assert Example.list_budgets() == [budget]
    end

    test "get_budget!/1 returns the budget with given id" do
      budget = budget_fixture()
      assert Example.get_budget!(budget.id) == budget
    end

    test "create_budget/1 with valid data creates a budget" do
      assert {:ok, %Budget{} = budget} = Example.create_budget(@valid_attrs)
      assert budget.amount == 42
      assert budget.category == "some category"
      assert budget.name == "some name"
    end

    test "create_budget/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Example.create_budget(@invalid_attrs)
    end

    test "update_budget/2 with valid data updates the budget" do
      budget = budget_fixture()
      assert {:ok, budget} = Example.update_budget(budget, @update_attrs)
      assert %Budget{} = budget
      assert budget.amount == 43
      assert budget.category == "some updated category"
      assert budget.name == "some updated name"
    end

    test "update_budget/2 with invalid data returns error changeset" do
      budget = budget_fixture()
      assert {:error, %Ecto.Changeset{}} = Example.update_budget(budget, @invalid_attrs)
      assert budget == Example.get_budget!(budget.id)
    end

    test "delete_budget/1 deletes the budget" do
      budget = budget_fixture()
      assert {:ok, %Budget{}} = Example.delete_budget(budget)
      assert_raise Ecto.NoResultsError, fn -> Example.get_budget!(budget.id) end
    end

    test "change_budget/1 returns a budget changeset" do
      budget = budget_fixture()
      assert %Ecto.Changeset{} = Example.change_budget(budget)
    end
  end

  describe "transactions" do
    alias BudgetApp.Example.Transaction

    @valid_attrs %{amount: 42, budget_id: 42, budget_name: "some budget_name", category: "some category", user: "some user"}
    @update_attrs %{amount: 43, budget_id: 43, budget_name: "some updated budget_name", category: "some updated category", user: "some updated user"}
    @invalid_attrs %{amount: nil, budget_id: nil, budget_name: nil, category: nil, user: nil}

    def transaction_fixture(attrs \\ %{}) do
      {:ok, transaction} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Example.create_transaction()

      transaction
    end

    test "list_transactions/0 returns all transactions" do
      transaction = transaction_fixture()
      assert Example.list_transactions() == [transaction]
    end

    test "get_transaction!/1 returns the transaction with given id" do
      transaction = transaction_fixture()
      assert Example.get_transaction!(transaction.id) == transaction
    end

    test "create_transaction/1 with valid data creates a transaction" do
      assert {:ok, %Transaction{} = transaction} = Example.create_transaction(@valid_attrs)
      assert transaction.amount == 42
      assert transaction.budget_id == 42
      assert transaction.budget_name == "some budget_name"
      assert transaction.category == "some category"
      assert transaction.user == "some user"
    end

    test "create_transaction/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Example.create_transaction(@invalid_attrs)
    end

    test "update_transaction/2 with valid data updates the transaction" do
      transaction = transaction_fixture()
      assert {:ok, transaction} = Example.update_transaction(transaction, @update_attrs)
      assert %Transaction{} = transaction
      assert transaction.amount == 43
      assert transaction.budget_id == 43
      assert transaction.budget_name == "some updated budget_name"
      assert transaction.category == "some updated category"
      assert transaction.user == "some updated user"
    end

    test "update_transaction/2 with invalid data returns error changeset" do
      transaction = transaction_fixture()
      assert {:error, %Ecto.Changeset{}} = Example.update_transaction(transaction, @invalid_attrs)
      assert transaction == Example.get_transaction!(transaction.id)
    end

    test "delete_transaction/1 deletes the transaction" do
      transaction = transaction_fixture()
      assert {:ok, %Transaction{}} = Example.delete_transaction(transaction)
      assert_raise Ecto.NoResultsError, fn -> Example.get_transaction!(transaction.id) end
    end

    test "change_transaction/1 returns a transaction changeset" do
      transaction = transaction_fixture()
      assert %Ecto.Changeset{} = Example.change_transaction(transaction)
    end
  end
end
