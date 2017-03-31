<?php

namespace Drupal\graphql_demo\GraphQL\Field\Article;

use Drupal\node\NodeInterface;
use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\Scalar\StringType;

class ArticleBodyField extends SelfAwareField {

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if ($value instanceof NodeInterface && $value->bundle() === 'article') {
      $field = $value->get('body');
      if ($first = $field->first()) {
        return $first->get('value')->getValue();
      }
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new StringType();
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'body';
  }
}