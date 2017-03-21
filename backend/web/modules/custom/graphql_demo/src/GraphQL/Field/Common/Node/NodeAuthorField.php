<?php

namespace Drupal\graphql_demo\GraphQL\Field\Common\Node;

use Drupal\graphql_demo\GraphQL\Type\UserType;
use Drupal\node\NodeInterface;
use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Youshido\GraphQL\Execution\ResolveInfo;

class NodeAuthorField extends SelfAwareField {

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($value instanceof NodeInterface) {
      return $value->getRevisionUser();
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new UserType();
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'author';
  }
}