<p align="center"><a href="https://cube.dev"><img src="https://i.imgur.com/zYHXm4o.png" alt="Cube.js" width="300px"></a></p>

[Website](https://cube.dev) • [Docs](https://cube.dev/docs) •
[Blog](https://cube.dev/blog) • [Slack](https://slack.cube.dev) • [Twitter](https://twitter.com/the_cube_dev)

# Supported tags and respective `Dockerfile` links

Debian based: `<version>`, `latest`, `dev`

Alpine based: `alpine`, `<version>-alpine`

# Quick reference

Where to get help? Check out our [Slack][link-slack], [Stack
Overflow][link-stack-overflow] or [GitHub Discussions][link-github-discussions]
pages.

[link-slack]: https://slack.cube.dev/
[link-stack-overflow]: https://stackoverflow.com/search?q=cube.js
[link-github-discussions]: https://github.com/cube-js/cube.js/discussions

Found an issue? File it on our GitHub Issues page.

Supported architectures: `amd64`

Need the documentation? Check out the [Cube.js documentation
website][link-cubejs-docs].

[link-cubejs-docs]: https://cube.dev/docs

# What is Cube.js?

Cube.js is an open-source analytical API platform. It is primarily used to build
internal business intelligence tools or add customer-facing analytics to
existing applications.

Cube.js was designed to work with Serverless Query Engines like AWS Athena and
Google BigQuery. Multi-stage querying approach makes it suitable for handling
trillions of data points. Most modern RDBMS work with Cube.js as well and can be
tuned for adequate performance.

Unlike others, it is not a monolith application, but a set of modules, which
does one thing well. Cube.js provides modules to run transformations and
modeling in data warehouse, querying and caching, managing API gateway and
building UI on top of that.

# How to use this image

## Start a Cube.js instance

```bash
docker pull cubejs/cube:latest
docker run -d -p 3000:3000 -p 4000:4000 \
  -e CUBEJS_DB_HOST=postgres://hostname \
  -e CUBEJS_DB_NAME=<DB_NAME> \
  -e CUBEJS_DB_USER=<USER> \
  -e CUBEJS_DB_PASS=<PASS> \
  -e CUBEJS_DB_TYPE=<DB_TYPE> \
  -e CUBEJS_API_SECRET=<API_SECRET> \
  -v $(pwd):/cube/conf \
  cubejs/cube:latest
```

The Cube.js Developer Playground will be available at `http://localhost:4000`.
For more information about supported environment variables, please consult the
documentation for [Environment Variables][link-cubejs-env-vars].

[link-cubejs-env-vars]: https://cube.dev/docs/reference/environment-variables

```bash
docker run -p 4000:4000 \
  -p 15432:15432 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  cubejs-cube
```

```bash
docker run -p 4000:4000 \
  -p 15432:15432 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  -e AUTH=true \
  -e AUTH_PUBLIC_KEY=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxRIop/1B6TlKZtWlMDbLvR9lyxgnXvtL75+hrzx1h7UX4DZCz92uEQLd6N9Jhd8oa6dQ3hnZI4DeIHIqoy6gSAlOe4Q0gI9g0kEBVPcSdbqRBQz1+Q+01lH8PTXLgzSUxqF27oUYJfXZq9INGtELfWluxq0utxZ75IYn9MiSrKHOynQN47Ct2itYTQStIkn7QqzzchDUl5iCrMaz53zQCGGyPaQwpwBBYRd/mr4hUpld87quTfF59xa8z1zSgsch/kKXsJ/Dgx84Imhlv+zyFrzQ05aC0qEuPJQi5a39SLTMrkLHsieeXiby1Z1wtfoa0RO7T4/dXOMfpvXu5fTPTQIDAQAB \
  -e AUTH_DOMAIN=http://chat.banmahui.cn \
  cubejs-cube
```

### Using Docker Compose

```yaml
version: '2.2'

services:
  cube:
    image: cubejs/cube:latest
    depends_on:
      - redis
    links:
      - redis
    ports:
      # It's better to use random port binding for 4000/3000 ports
      # without it you will not able to start multiple projects inside docker
      - 4000:4000  # Cube.js API and Developer Playground
      - 3000:3000  # Dashboard app, if created
    env_file: .env
    volumes:
      # If you are going to use own dependencies, for example axios/vault or anything else for getting configuration
      - .:/cube/conf

  redis:
    image: redis:6
    restart: always
```

### License

Cube.js Docker is [Apache 2.0 licensed](./LICENSE).
