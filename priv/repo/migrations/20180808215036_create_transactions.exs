defmodule BudgetApp.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:transactions) do
      add :budget_id, :integer
      add :budget_name, :string
      add :amount, :integer
      add :user, :string
      add :category, :string

      timestamps()
    end

  end
end
