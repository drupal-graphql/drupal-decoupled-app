<?php

namespace Drupal\graphql_demo;

use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\Core\Entity\EntityInterface;

class RouteObjectWrapper implements CacheableDependencyInterface {
  /**
   * @inheritDoc
   */
  public function getCacheContexts() {
    return $this->entity->getCacheContexts();
  }

  /**
   * @inheritDoc
   */
  public function getCacheTags() {
    return $this->entity->getCacheTags();
  }

  /**
   * @inheritDoc
   */
  public function getCacheMaxAge() {
    return $this->entity->getCacheMaxAge();
  }

  /**
   * The wrapped entity.
   *
   * @var \Drupal\Core\Entity\EntityInterface
   */
  protected $entity;

  /**
   * Constructs a RouteObjectWrapper object.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   */
  public function __construct(EntityInterface $entity) {
    $this->entity = $entity;
  }

  /**
   * Returns the wrapped entity.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   */
  public function getWrappedEntity() {
    return $this->entity;
  }
}
