<?php

namespace Drupal\graphql_demo\GraphQL\Relay\Connection;

use Youshido\GraphQL\Relay\Connection\Connection as ConnectionBase;
use Youshido\GraphQL\Type\AbstractType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\IntType;
use Youshido\GraphQL\Type\TypeMap;

/**
 * This is a quick fix for enabling relay to use 'first' and 'last' in the same
 * query which is currently not possible by default. We simply use the 'offset'
 * argument instead so relay lets it pass.
 */
class Connection extends ConnectionBase {

  /**
   * {@inheritdoc}
   */
  public static function connectionArgs() {
    return array_merge(parent::connectionArgs(), self::offsetArgs());
  }

  /**
   * {@inheritdoc}
   */
  public static function offsetArgs() {
    return ['offset' => ['type' => TypeMap::TYPE_INT]];
  }

  /**
   * {@inheritdoc}
   */
  public static function connectionDefinition(AbstractType $type, $name = NULL, $config = []) {
    $config['connectionFields'] = !empty($config['connectionFields']) ? $config['connectionFields'] : [
      'count' => [
        'type' => new NonNullType(new IntType()),
        'description' => 'Number of items in the full result set.',
        'resolve' => [__CLASS__, 'getCount'],
      ],
    ];

    return parent::connectionDefinition($type, $name, $config);
  }

  /**
   * Resolver function for the 'count' field.
   *
   * @param $value
   *   The resolved parent value.
   *
   * @return int|null
   *   The number of items in the full result set.
   */
  public static function getCount($value) {
    return isset($value['count']) ? $value['count'] : NULL;
  }
}