<?php

namespace Drupal\graphql_demo\GraphQL\Type;

use Drupal\graphql\GraphQL\Type\AbstractObjectType;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityIdField;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityLabelField;
use Drupal\graphql_demo\GraphQL\Relay\Field\GlobalIdField;
use Drupal\graphql_demo\GraphQL\Relay\Type\NodeInterfaceType;

class UserType extends AbstractObjectType {

  /**
   * {@inheritdoc}
   */
  public function build($config) {
    $config->addField(new EntityIdField());
    $config->addField(new EntityLabelField());
  }
  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'User';
  }
}
