import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn: "https://024af778373246b684d09b28eda72589@sentry.io/1403515"
  // });
}

function log(error) {
  console.error(error);
  // Sentry.captureException(error);
}

export default {
  init: init,
  log: log
};
