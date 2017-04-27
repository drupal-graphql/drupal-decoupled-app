<?php

namespace Drupal\graphql_demo\GraphQL\Relay;

use Drupal\graphql_demo\GraphQL\Relay\Field\NodeField;
use Drupal\graphql\GraphQL\Schema as BaseSchema;
use Youshido\GraphQL\Config\Schema\SchemaConfig;
use Youshido\GraphQL\Type\NonNullType;

class Schema extends BaseSchema {

  /**
   * {@inheritdoc}
   */
  public function build(SchemaConfig $config) {
    $query = $config->getQuery();
    $query->addField(new NodeField());

    // Add all fields to a field on the root query object (recursive). This is
    // required to enable adding a recursive reference to the query root for use
    // in a React & Relay setting.
    //
    // @see https://github.com/facebook/relay/issues/112#issuecomment-170648934
    $query->addField('root', [
      'type' => new NonNullType($query),
      'resolve' => [get_class($this), 'resolveRoot'],
    ]);
  }

  /**
   * Dummy resolve function.
   *
   * Used to enable adding a recursive reference to the query root for use in
   * a React & Relay setting.
   *
   * @see https://github.com/facebook/relay/issues/112#issuecomment-170648934
   */
  public static function resolveRoot() {
    return [];
  }
}
