<?php

namespace Drupal\graphql_demo\GraphQL\Field\Common\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\graphql\GraphQL\CacheableLeafValue;
use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;

class EntityLabelField extends SelfAwareField {

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($value instanceof ContentEntityInterface) {
      return new CacheableLeafValue($value->label(), [$value]);
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new NonNullType(new StringType());
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'entityLabel';
  }
}