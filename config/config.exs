# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :budget_app,
  ecto_repos: [BudgetApp.Repo]

# Configures the endpoint
config :budget_app, BudgetAppWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "PWKVvqeEe3PB4bMFBh/3wmSAhdcHZMKI/1gznyXMbHl3nZo/g8GH953tA+vU+9nH",
  render_errors: [view: BudgetAppWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: BudgetApp.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
