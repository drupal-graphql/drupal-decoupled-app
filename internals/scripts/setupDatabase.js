/**
 * @file    database setup script.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import mongoose from 'mongoose';
import creators from '../../server/schema/setup';

// Load the environment configuration.
require('dotenv-extended').config({
  path     : '.env.local',
  defaults : '.env',
});

// Use promises for mongoose async operations.
mongoose.Promise = Promise;

/**
 * assign promise result.
 *
 * @desc    returns a promise callback that formats the promise result as a keyed object
 * @param   {String[]} keys - keys to map the results to
 * @returns {Function}
 */
const assignPromiseResult = (keys : string[]) => (results : any[]) =>
  results.reduce((carry, result, index) => ({
    ...carry,
    [keys[index]]: result,
  }), {});

/**
 * ensure saved.
 *
 * @desc    ensures that the passed model is saved
 * @param   {any} object - mongoose model to be saved
 * @returns {any | Promise}
 */
const ensureSaved = (object : any) => {
  if (object.isNew || object.isModified()) {
    return object.save();
  }

  return object;
};

/**
 * create documents
 *
 * @desc    returns a promise callback that maintains the keys of the result of
 *          the creator function call.
 * @param   {Function[]} creator - document creator callback
 * @returns {Function}
 */
const createDocuments = (creator) => (state) => {
  const input = creator(state);

  if (Array.isArray(input)) {
    const instances = input
      .map((item) => item.then(ensureSaved));

    return Promise.all(instances);
  }

  const keys = Object.keys(input);
  const instances = Object
    .values(input)
    .map((item) => item.then(ensureSaved));

  return Promise
    .all(instances)
    .then(assignPromiseResult(keys));
};

/**
 * create documents and merge
 *
 * @desc    returns a promise callback that merges the result of the creator
 *          function call into a state object
 * @param   {Function[]} creator - document creator callback
 * @param   {String}        key  - object key to merge into
 * @returns {Function}
 */
const createDocumentsAndMerge = (creator, key) => {
  const createDocumentsInstance = createDocuments(creator);

  return async (state) => {
    const results = await createDocumentsInstance(state);
    const count = Object.keys(results).length;
    console.log(`Created ${count} documents (${key}).`);

    return ({
      ...state,
      [key]: results,
    });
  };
};

/**
 * do sequentially
 *
 * @desc    sequentially calls a series of functions passing the result of each
 *          to the next one in the sequence
 * @param   {Function[]} object - sequence of functions to be resolved
 * @param   {any}        inital - value to pass to the first function
 * @returns {Promise}
 */
const doSequentially = (sequence : Promise[], initial : any) =>
  sequence.reduce((carry, current) => carry.then(current), Promise.resolve(initial));

/**
 * setup database
 *
 * @desc   main entry point for this script
 * @return {null}
 */
const setupDatabase = async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const { name } of collections) {
    if (await mongoose.connection.db.collection(name).count()) {
      console.log('The database has already been initialized. Exiting.');

      // Let's not override any existing documents. Stop the setup here.
      process.exit();
    }
  }

  console.log('Starting to set up the database with fake data.');

  const creatorSequence = Object
    .keys(creators)
    .map((key) => createDocumentsAndMerge(creators[key], key));

  try {
    await doSequentially(creatorSequence, {});
    console.log('Done.');
  } catch (error) {
    console.error(error);
  }

  process.exit();
};

mongoose
  .connect(process.env.DATABASE)
  .then(setupDatabase);
