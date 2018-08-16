defmodule BudgetApp.Repo.Migrations.CreateBudgets do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:budgets) do
      add :name, :string
      add :amount, :integer
      add :category, :string

      timestamps()
    end

  end
end
