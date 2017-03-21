<?php

namespace Drupal\graphql_demo\GraphQL\Relay\Type;

use Drupal\graphql_demo\GraphQL\Relay\Field\GlobalIdField;
use Drupal\graphql_demo\GraphQL\ResolveHelper;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Youshido\GraphQL\Type\InterfaceType\AbstractInterfaceType;

class NodeInterfaceType extends AbstractInterfaceType implements ContainerAwareInterface {
  use ContainerAwareTrait;

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'NodeInterface';
  }

  /**
   * {@inheritdoc}
   */
  public function build($config) {
    $config->addField(new GlobalIdField('node'));
  }

  /**
   * {@inheritdoc}
   */
  public function resolveType($object) {
    return ResolveHelper::resolveType($object);
  }
}
