<?php

namespace Drupal\graphql_demo\GraphQL\Field\Route;

use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Drupal\graphql_demo\RouteObjectWrapper;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;

class RoutePreferredUriField extends SelfAwareField implements ContainerAwareInterface {
  use ContainerAwareTrait;

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($value instanceof RouteObjectWrapper) {
      $entity = $value->getWrappedEntity();

      /** @var \Drupal\Core\Path\\AliasManagerInterface $aliasManager */
      $aliasManager = $this->container->get('path.alias_manager');
      $internalPath = $entity->toUrl('canonical')->getInternalPath();

      if ($alias = $aliasManager->getAliasByPath("/$internalPath")) {
        return strpos($alias, '/') === 0 ? $alias : "/$alias";
      }
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'preferred';
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new NonNullType(new StringType());
  }
}
