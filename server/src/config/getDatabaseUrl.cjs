const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/launch-social_development",
      test: "postgres://postgres:postgres@localhost:5432/launch-social_test",
      e2e: "postgres://postgres:postgres@localhost:5432/launch-social_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  )
}

module.exports = getDatabaseUrl
