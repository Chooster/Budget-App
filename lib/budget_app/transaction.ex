defmodule BudgetApp.Transaction do
  use Ecto.Schema
  import Ecto.Changeset


  schema "transactions" do
    field :amount, :integer
    field :budget_id, :integer
    field :budget_name, :string
    field :category, :string
    field :user, :string

    timestamps()
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:budget_id, :budget_name, :amount, :user, :category])
    |> validate_required([:budget_id, :budget_name, :amount, :user, :category])
  end
end
