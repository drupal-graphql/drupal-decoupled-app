<?php

namespace Drupal\graphql_demo\GraphQL\Relay\Connection;

use Youshido\GraphQL\Relay\Connection\ArrayConnection as ArrayConnectionBase;

/**
 * This is a quick fix for enabling relay to use 'first' and 'last' in the same
 * query which is currently not possible by default. We simply use the 'offset'
 * argument instead so relay lets it pass.
 */
class ArrayConnection extends ArrayConnectionBase {

  /**
   * {@inheritdoc}
   */
  public static function connectionFromArray(array $data, array $args = []) {
    if (isset($args['offset']) && !isset($args['first'])) {
      $args['first'] = $args['offset'];
    }

    $connection = parent::connectionFromArray($data, $args);

    return $connection + [
      'count' => count($data),
    ];
  }
}