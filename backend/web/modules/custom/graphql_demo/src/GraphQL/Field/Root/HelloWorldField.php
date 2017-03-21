<?php

namespace Drupal\graphql_demo\GraphQL\Field\Root;

use Drupal\graphql_demo\GraphQL\Field\SelfAwareField;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\InputField;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;

class HelloWorldField extends SelfAwareField {

  /**
   * {@inheritdoc}
   */
  public function build(FieldConfig $config) {
    $config->addArgument(new InputField([
      'name' => 'name',
      'type' => new StringType(),
    ]));
  }

  /**
   * {@inheritdoc}
   */
  public function resolve($value, array $args, ResolveInfo $info) {
    if (empty($args['name'])) {
      return 'Hello world!';
    }

    return "Hello ${args['name']}!";
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'helloWorld';
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return new NonNullType(new StringType());
  }
}