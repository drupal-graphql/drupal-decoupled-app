/**
 * @file    data creator definitions.
 * @author  Campbell Vertesi <campbell@vertesi.com>
 * @date    2016-06-21
 */

import faker from 'faker';
import { addArticle } from './models/article';

/**
 * node counts
 *
 * @desc How many of each node type to create.
 */
const nodeCounts = {
  articlesCount : 100,
};

/**
 * random number
 *
 * @desc   Get a random number between the given constraints.
 * @param  {Float} min - the minimun value
 * @param  {Float} max - the maximum value
 * @return {Float} the random number
 */
const randomNumber = (min, max) =>
  Math.max(min, Math.floor(Math.random() * max));

/**
 * subset from array
 *
 * Create an array of ${array} values, make it a Set for uniqueness, but return
 * an array. Oh jeebus.
 *
 * @desc    Get a random subset of unique values from an array, up to maxCount.
 * @param   {Array} sourceArray  - array of source values.
 * @param   {Number} maxCount - maximum array size to return.
 * @returns {Array}
 */
const subsetFromArray = (sourceArray, maxCount) =>
  Array.from(new Set(Array.from(Array(maxCount)).map(() =>
    faker.random.arrayElement(sourceArray)
  )));

 /**
 * Array from Generator
 *
 * @desc    Generate an array with a given generator.
 * @param   {Function} generator  - the generator to use for creating values
 * @param   {Number}   count      - array size to return
 * @returns {Array}
 */
const arrayFromGenerator = (generator, count) =>
  Array.from(Array(count)).map(() =>
    generator()
  );

/**
 * create articles
 *
 * @desc    Create dummy content articles.
 * @returns {Array}
 */
const createArticles = () => {

  // Array of available tags.
  const tags = arrayFromGenerator(faker.company.bs, 500);

  // Number of tags per article.
  const maxTags = 4;
  const minTags = 1;

  // Number of paragraphs per article.
  const maxParagraphs = 4;
  const minParargraphs = 1;

  return Array.from(Array(nodeCounts.articlesCount)).map(() => {
    const numTags = randomNumber(minTags, maxTags);
    const numParagraphs = randomNumber(minParargraphs, maxParagraphs);

    return addArticle({
      title: faker.lorem.words(3),
      author: faker.name.findName(),
      tags: subsetFromArray(tags, numTags),
      body: faker.lorem.paragraphs(numParagraphs),
    });
  });
};

export default {
  articles: createArticles,
};
