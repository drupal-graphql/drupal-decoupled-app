<?php

namespace Drupal\graphql_demo\SchemaProvider;

use Drupal\graphql\SchemaProvider\SchemaProviderBase;
use Drupal\graphql_demo\GraphQL\Field\Root\AllArticlesField;
use Drupal\graphql_demo\GraphQL\Field\Root\HelloWorldField;
use Drupal\graphql_demo\GraphQL\Field\Root\RouteByPathField;

/**
 * Generates a GraphQL Schema.
 */
class SchemaProvider extends SchemaProviderBase {

  /**
   * {@inheritdoc}
   */
  public function getQuerySchema() {
    return [
      new RouteByPathField(),
      new AllArticlesField(),
      new HelloWorldField(),
    ];
  }
}
