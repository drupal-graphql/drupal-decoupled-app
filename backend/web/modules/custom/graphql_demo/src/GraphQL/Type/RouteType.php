<?php

namespace Drupal\graphql_demo\GraphQL\Type;

use Drupal\graphql\GraphQL\Type\AbstractObjectType;
use Drupal\graphql_demo\GraphQL\Field\Route\RouteCanonicalUriField;
use Drupal\graphql_demo\GraphQL\Field\Route\RouteObjectField;
use Drupal\graphql_demo\GraphQL\Field\Route\RoutePreferredUriField;

class RouteType extends AbstractObjectType {

  /**
   * {@inheritdoc}
   */
  public function build($config) {
    $config->addField(new RouteCanonicalUriField());
    $config->addField(new RoutePreferredUriField());
    $config->addField(new RouteObjectField());
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'Route';
  }
}
