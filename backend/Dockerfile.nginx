ARG CLI_IMAGE
FROM ${CLI_IMAGE} as cli

FROM amazeeio/nginx-drupal

COPY .lagoon/nginx-drupal-cors.conf /etc/nginx/conf.d/drupal/location_drupal_prepend.conf

COPY --from=cli /app /app

# Define where the Drupal Root is located
ENV WEBROOT=web
