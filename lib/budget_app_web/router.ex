defmodule BudgetAppWeb.Router do
  use BudgetAppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BudgetAppWeb do
    pipe_through :api

    resources "/budgets", BudgetController, except: [:new, :edit]
    # get "/budgets", BudgetsController, :index
    # post "/budgets", BudgetsController, :create
    # show "/budgets/:id", BudgetsController, :show
    # put "/budgets/:id", BudgetsController, :update

    resources "/transactions", TransactionController, except: [:new, :edit]
    # get "/transactions", TransactionsController, :index
    # post "/transactions", TransactionsController, :create
    # show "/transactions/:id", TransactionsController, :show
    # put "/transactions/:id", TransactionsController, :update
  end

  scope "/", BudgetAppWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  
end
