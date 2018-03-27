// The only configuration relevant for the run-time environment is
// the location of the build directory. Keeping this separated allows
// us to not have to copy the webpack development dependencies into
// the production container.
module.exports = {
  distDir: '../dist',
};
