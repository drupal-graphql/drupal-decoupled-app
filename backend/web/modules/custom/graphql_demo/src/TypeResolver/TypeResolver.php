<?php

namespace Drupal\graphql_demo\TypeResolver;

use Drupal\Core\TypedData\DataDefinitionInterface;
use Drupal\graphql\TypeResolver\TypeResolverInterface;
use Drupal\graphql_demo\GraphQL\Type\ArticleType;
use Drupal\graphql_demo\GraphQL\Type\BasicPageType;
use Drupal\graphql_demo\GraphQL\Type\CommentType;
use Drupal\graphql_demo\GraphQL\Type\ExplainingArticleType;
use Drupal\graphql_demo\GraphQL\Type\KeywordType;
use Drupal\graphql_demo\GraphQL\Type\LandingPageType;
use Drupal\graphql_demo\GraphQL\Type\PageType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\ChannelBoxParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\EmbedParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\FocusBoxParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\ImageParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\InfoBoxParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\LinkBoxParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\MinistageParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\TeaserParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\TextParagraphType;
use Drupal\graphql_demo\GraphQL\Type\Paragraph\VideoParagraphType;
use Drupal\graphql_demo\GraphQL\Type\PersonType;
use Drupal\graphql_demo\GraphQL\Type\ProductType;
use Drupal\graphql_demo\GraphQL\Type\RecipeType;
use Drupal\graphql_demo\GraphQL\Type\SponsorType;
use Drupal\graphql_demo\GraphQL\Type\UserType;

class TypeResolver implements TypeResolverInterface {

  /**
   * {@inheritdoc}
   */
  public function resolveRecursive(DataDefinitionInterface $definition) {
    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function applies(DataDefinitionInterface $definition) {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function collectTypes() {
    return [
      // Route object types.
      new ArticleType(),
      new BasicPageType(),
      new UserType(),
    ];
  }
}
