<?php

namespace Drupal\graphql_demo\GraphQL\Relay\Field;

use Drupal\Core\Entity\EntityInterface;
use Drupal\graphql_demo\RouteObjectWrapper;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Relay\Field\GlobalIdField as GlobalIdFieldBase;
use Youshido\GraphQL\Relay\Node;

class GlobalIdField extends GlobalIdFieldBase implements ContainerAwareInterface {
  use ContainerAwareTrait;

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($this->typeName === 'route') {
      if ($value instanceof RouteObjectWrapper) {
        $entity = $value->getWrappedEntity();
        $path = $entity->toUrl('canonical')->getInternalPath();
        return Node::toGlobalId($this->typeName, $path);
      }

      return NULL;
    }

    if ($value instanceof EntityInterface) {
      return Node::toGlobalId($this->typeName, $value->id());
    }

    return NULL;
  }
}