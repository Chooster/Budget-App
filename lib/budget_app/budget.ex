defmodule BudgetApp.Budget do
  use Ecto.Schema
  import Ecto.Changeset


  schema "budgets" do
    field :amount, :integer
    field :category, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(budget, attrs) do
    budget
    |> cast(attrs, [:name, :amount, :category])
    |> validate_required([:name, :amount, :category])
  end
end
