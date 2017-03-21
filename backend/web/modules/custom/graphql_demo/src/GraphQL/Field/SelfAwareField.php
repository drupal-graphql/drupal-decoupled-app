<?php

namespace Drupal\graphql_demo\GraphQL\Field;

use Youshido\GraphQL\Field\AbstractField;

abstract class SelfAwareField extends AbstractField {

  /**
   * {@inheritdoc}
   */
  public function __construct() {
    parent::__construct([]);
  }
}