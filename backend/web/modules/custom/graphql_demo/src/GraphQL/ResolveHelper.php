<?php

namespace Drupal\graphql_demo\GraphQL;

use Drupal\node\NodeInterface;
use Drupal\graphql_demo\GraphQL\Type\ArticleType;
use Drupal\graphql_demo\GraphQL\Type\BasicPageType;
use Drupal\graphql_demo\GraphQL\Type\RouteType;
use Drupal\graphql_demo\GraphQL\Type\UserType;
use Drupal\graphql_demo\RouteObjectWrapper;
use Drupal\user\UserInterface;

class ResolveHelper {

  /**
   * Resolves a given object into its corresponding, allowed type.
   *
   * @param $object
   *   The object to resolve the type of.
   * @param array|null $allowed
   *   The array of allowed types.
   *
   * @return \Youshido\GraphQL\Type\AbstractType|null
   */
  public static function resolveType($object, array $allowed = NULL) {
    if ($type = static::doResolveType($object)) {
      return !empty($allowed) ? in_array(get_class($object), $allowed) : $type;
    }

    return NULL;
  }

  /**
   * Resolves a given object into its corresponding type.
   *
   * @param $object
   *   The object to resolve the type of.
   *
   * @return \Youshido\GraphQL\Type\AbstractType|null
   */
  protected static function doResolveType($object) {
    if ($object instanceof RouteObjectWrapper) {
      return new RouteType();
    }

    if ($object instanceof NodeInterface) {
      return static::doResolveNode($object);
    }

    if ($object instanceof UserInterface) {
      return static::doResolveUser($object);
    }

    return NULL;
  }

  /**
   * Resolves a given object into its corresponding type.
   *
   * @param \Drupal\Core\Entity\EntityInterface $object
   *   The object to resolve the type of.
   *
   * @return \Youshido\GraphQL\Type\AbstractType|null
   */
  protected static function doResolveNode($object) {
    $bundle = $object->bundle();

    if ($bundle === 'article') {
      return new ArticleType();
    }

    if ($bundle === 'page') {
      return new BasicPageType();
    }

    return NULL;
  }

  /**
   * Resolves a given object into its corresponding type.
   *
   * @param \Drupal\Core\Entity\EntityInterface $object
   *   The object to resolve the type of.
   *
   * @return \Youshido\GraphQL\Type\AbstractType|null
   */
  protected static function doResolveUser($object) {
    return new UserType();
  }
}
