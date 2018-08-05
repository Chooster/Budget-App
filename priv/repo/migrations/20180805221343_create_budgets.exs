defmodule BudgetApp.Repo.Migrations.CreateBudgets do
  use Ecto.Migration

  def change do
    create table(:budgets) do
      add :name, :string
      add :amount, :integer
      add :category, :string

      timestamps()
    end

  end
end
