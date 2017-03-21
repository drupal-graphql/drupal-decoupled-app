<?php

namespace Drupal\graphql_demo\GraphQL\Field\Route;

use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Drupal\graphql_demo\GraphQL\Type\RouteObjectInterfaceType;
use Drupal\graphql_demo\RouteObjectWrapper;
use Youshido\GraphQL\Execution\ResolveInfo;

class RouteObjectField extends SelfAwareField {

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($value instanceof RouteObjectWrapper) {
      return $value->getWrappedEntity();
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'object';
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new RouteObjectInterfaceType();
  }
}