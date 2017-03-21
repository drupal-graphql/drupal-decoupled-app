<?php

namespace Drupal\graphql_demo\GraphQL\Field\Common\Entity;

use Drupal\Core\Entity\EntityInterface;
use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;

class EntityPreferredUriField extends SelfAwareField implements ContainerAwareInterface {
  use ContainerAwareTrait;

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($value instanceof EntityInterface) {
      /** @var \Drupal\Core\Path\\AliasManagerInterface $aliasManager */
      $aliasManager = $this->container->get('path.alias_manager');
      $internalPath = $value->toUrl('canonical')->getInternalPath();

      if ($alias = $aliasManager->getAliasByPath("/$internalPath")) {
        // Return an uncacheable string result, because aliases don't have caching
        // metadata and can change independently of the destination entity.
        return strpos($alias, '/') === 0 ? $alias : "/$alias";
      }
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
    return 'preferredUri';
  }
}
