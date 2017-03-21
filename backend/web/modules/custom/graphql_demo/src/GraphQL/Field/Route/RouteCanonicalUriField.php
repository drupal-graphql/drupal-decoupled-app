<?php

namespace Drupal\graphql_demo\GraphQL\Field\Route;

use Drupal\graphql\GraphQL\CacheableLeafValue;
use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Drupal\graphql_demo\RouteObjectWrapper;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;

class RouteCanonicalUriField extends SelfAwareField {

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($value instanceof RouteObjectWrapper) {
      $entity = $value->getWrappedEntity();
      $path = $entity->toUrl('canonical')->getInternalPath();
      return new CacheableLeafValue(strpos($path, '/') === 0 ? $path : "/$path", [$value]);
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'canonical';
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new NonNullType(new StringType());
  }
}
