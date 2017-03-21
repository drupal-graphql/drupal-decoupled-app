<?php

namespace Drupal\graphql_demo\GraphQL\Type;

use Drupal\graphql\GraphQL\Type\AbstractObjectType;
use Drupal\graphql_demo\GraphQL\Field\BasicPage\BasicPageBodyField;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityCanonicalUriField;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityIdField;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityLabelField;
use Drupal\graphql_demo\GraphQL\Field\Common\Entity\EntityPreferredUriField;
use Drupal\graphql_demo\GraphQL\Field\Common\Node\NodeAuthorField;
use Drupal\graphql_demo\GraphQL\Field\Common\Node\NodeChangedDateField;
use Drupal\graphql_demo\GraphQL\Field\Common\Node\NodeCreateDateField;
use Drupal\graphql_demo\GraphQL\Field\Root\HelloWorldField;
use Drupal\graphql_demo\GraphQL\Relay\Field\GlobalIdField;
use Drupal\graphql_demo\GraphQL\Relay\Type\NodeInterfaceType;

class BasicPageType extends AbstractObjectType {

  /**
   * {@inheritdoc}
   */
  public function build($config) {
    $config->addField(new GlobalIdField('basic-page'));
    $config->addField(new EntityCanonicalUriField());
    $config->addField(new EntityPreferredUriField());
    $config->addField(new EntityIdField());
    $config->addField(new EntityLabelField());
    $config->addField(new NodeChangedDateField());
    $config->addField(new NodeCreateDateField());
    $config->addField(new HelloWorldField());
    $config->addField(new BasicPageBodyField());
    $config->addField(new NodeAuthorField());
  }

  /**
   * {@inheritdoc}
   */
  public function getInterfaces() {
    return [
      new NodeInterfaceType(),
      new RouteObjectInterfaceType(),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'BasicPage';
  }
}
