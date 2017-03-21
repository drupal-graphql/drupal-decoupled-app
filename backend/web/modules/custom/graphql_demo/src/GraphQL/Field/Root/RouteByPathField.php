<?php

namespace Drupal\graphql_demo\GraphQL\Field\Root;

use Drupal\Core\Url;
use Drupal\node\NodeInterface;
use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Drupal\graphql_demo\GraphQL\Type\RouteType;
use Drupal\graphql_demo\RouteObjectWrapper;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\InputField;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;

class RouteByPathField extends SelfAwareField implements ContainerAwareInterface {
  use ContainerAwareTrait;

  /**
   * {@inheritdoc}
   */
  public function build(FieldConfig $config) {
    $config->addArgument(new InputField([
      'name' => 'path',
      'type' => new NonNullType(new StringType()),
    ]));
  }

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if (!$entity = $this->loadEntityByPath($args['path'])) {
      return NULL;
    }

    // Prevent access to entities that the user is not allowed to view.
    if (!$entity->access('view')) {
      return NULL;
    }

    if ($entity instanceof NodeInterface) {
      $bundle = $entity->bundle();

      if (in_array($bundle, array('page', 'article'), TRUE)) {
        return new RouteObjectWrapper($entity);
      }
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'routeByPath';
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new RouteType();
  }

  /**
   * Helper function to load an entity by its path.
   *
   * @param $path
   *   The internal path or url alias pointing to an entity.
   * @return \Drupal\Core\Entity\EntityInterface|NULL
   *   The loaded entity object or NULL if no entity can be mapped to that path.
   */
  protected function loadEntityByPath($path) {
    // Get the route definition from the internal path.
    if ((!$route = Url::fromUri("internal:/$path")) || !$route->isRouted()) {
      return NULL;
    }

    // Check if the route is a canonical entity route.
    $routeName = $route->getRouteName();
    list($prefix, $entityType, $suffix) = explode('.', $routeName);

    if (!($prefix === 'entity' && $suffix === 'canonical')) {
      return NULL;
    }

    /** @var \Drupal\Core\Entity\EntityTypeManager $entityTypeManager */
    $entityTypeManager = $this->container->get('entity_type.manager');
    /** @var \Drupal\Core\Entity\ContentEntityStorageInterface $entityStorage */
    $entityStorage = $entityTypeManager->getStorage($entityType);

    // Extract the entity id from the route parameters.
    $routeParameters = $route->getRouteParameters();
    $entityId = $routeParameters[$entityType];

    if (($entity = $entityStorage->load($entityId)) && $entity->access('view')) {
      return $entity;
    }

    return NULL;
  }
}