#### Once the repo is cloned, search for the keyword `TODO` to fill out the template. There should be no `TODO`'s left over, and this README should be rewritten to reflect relevant information for the new command.

#### The following files are in this template:

### build.json

The automated instructions for testing and deploying this function, and publishing it's documentation. This is interpreted by Google Cloud Build after the trigger is configured.

To run the build locally, issue the command `cloud-build-local --config=build.json --dryrun=false .` from the repo's home directory. This will take a while the first time since you have to download the containers that the build steps are executed in.

See https://cloud.google.com/cloud-build/docs/build-debug-locally for more info on local builds.

### doc.json

The documentation that will be published to docs.sustainernetwork.org through Cloud Endpoints. This follows the OpenAPI specs.

To check for proper formatting before submitting, do `yarn checkbuild`.

### index.js

This is the body of the function and should just immediately call a function imported from a package.

### test.js

Integration tests for this command.
