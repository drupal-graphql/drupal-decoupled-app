<?php

namespace Drupal\graphql_demo\GraphQL\Type;

use Drupal\graphql\GraphQL\Type\AbstractInterfaceType;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityCanonicalUriField;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityPreferredUriField;
use Drupal\graphql_demo\GraphQL\ResolveHelper;

class RouteObjectInterfaceType extends AbstractInterfaceType  {

  /**
   * {@inheritdoc}
   */
  public function build($config) {
    $config->addField(new EntityCanonicalUriField());
    $config->addField(new EntityPreferredUriField());
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'RouteObjectInterface';
  }

  /**
   * {@inheritdoc}
   */
  public function resolveType($object) {
    return ResolveHelper::resolveType($object);
  }
}
