<?php

namespace Drupal\graphql_demo\SchemaProvider;

use Drupal\graphql\SchemaProvider\SchemaProviderInterface;
use Drupal\graphql_demo\GraphQL\Field\Root\AllArticlesField;
use Drupal\graphql_demo\GraphQL\Field\Root\HelloWorldField;
use Drupal\graphql_demo\GraphQL\Field\Root\RouteByPathField;
use Drupal\graphql_demo\GraphQL\Type\ArticleType;
use Drupal\graphql_demo\GraphQL\Type\BasicPageType;
use Drupal\graphql_demo\GraphQL\Type\UserType;
use Youshido\GraphQL\Schema\Schema;

/**
 * Generates a GraphQL Schema.
 */
class SchemaProvider implements SchemaProviderInterface {

  /**
   * {@inheritdoc}
   */
  public function getSchema() {
    $schema = new Schema();
    $schema->addQueryField(new RouteByPathField());
    $schema->addQueryField(new AllArticlesField());
    $schema->addQueryField(new HelloWorldField());

    $types = $schema->getTypesList();
    $types->addType(new ArticleType());
    $types->addType(new BasicPageType());
    $types->addType(new UserType());

    return $schema;
  }
}
