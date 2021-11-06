FROM ruby:3.0.2-alpine AS build-env

ARG RAILS_ROOT=/app
ARG BUILD_PACKAGES="build-base"
ARG DEV_PACKAGES="mariadb-dev"
ARG RUBY_PACKAGES="tzdata"
ARG BUNDLE_PATH="/usr/local/bundle"

ENV RAILS_ENV=production
ENV BUNDLE_APP_CONFIG="${BUNDLE_PATH}/.bundle"

# install packages
RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache $BUILD_PACKAGES $DEV_PACKAGES $RUBY_PACKAGES

WORKDIR $RAILS_ROOT

# install rubygem
COPY Gemfile Gemfile.lock $RAILS_ROOT/

RUN bundle config --global frozen 1 \
    && bundle config set --local path ${BUNDLE_PATH} \
    && bundle config set without development:test:assets \
    && bundle install -j4 --retry 3 \
    # Remove unneeded files (cached *.gem, *.o, *.c)
    && rm -rf ${BUNDLE_PATH}/ruby/3.0.0/cache/*.gem \
    && find ${BUNDLE_PATH}/ruby/3.0.0/gems/ -name "*.c" -delete \
    && find ${BUNDLE_PATH}/ruby/3.0.0/gems/ -name "*.o" -delete

FROM ruby:3.0.2-alpine

ARG RAILS_ROOT=/app
ARG RUBY_PACKAGES="tzdata mariadb-dev"
ARG BUNDLE_PATH="/usr/local/bundle"

ENV RAILS_ENV=production
ENV BUNDLE_APP_CONFIG="${BUNDLE_PATH}/.bundle"

# install packages
RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache $PACKAGES $RUBY_PACKAGES

WORKDIR ${RAILS_ROOT}

COPY --from=build-env ${BUNDLE_PATH} ${BUNDLE_PATH}
COPY . .

# Add a script to be executed every time container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
CMD [ "bin/rails", "server", "-b", "0.0.0.0" ]
