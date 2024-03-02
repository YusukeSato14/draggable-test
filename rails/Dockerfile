FROM ruby:2.7

ENV LANG=C.UTF-8 \
  TZ=Asia/Tokyo

WORKDIR /workspace
RUN apt-get update -qq && apt-get install -y nodejs
COPY Gemfile /workspace/Gemfile
COPY Gemfile.lock /workspace/Gemfile.lock
RUN bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]
