Getting Started:

To get started with the lenses environment I installed Docker, pulled the image and run the container 
using the recommended command.
Cypress is installed via npm as a dev dependendy, as recommended.


Implementation:

The tests are organized in two suites, a "Navigation" suite and a "Creation" suite. Navigation checks that the user
is able to correctly navigate to the policies route and can load the default policies, while the Create suite checks that
the create and delete policy actions work properly.

I have attempted to make each test autonomous. The use of beforeEach() as well as each test's implementation should allow them
to be able to run independently, regardless of if other tests in the same suite are also run.
For example, the create policy test first attempts to clean up after previous tests that created the 
same test policy, in order to start clean and avoid the "already defined" error.
This way, the test doesn't rely on the delete policy test also being run to clean up after it.

Reusable logic is wrapped in functions, specifically "toPolicy()" and "deletePolicy()". I initially implemented them
as cypress commands, but later moved them to test-file specific functions, since they can't be used globally
as long as they rely on specific DOM structure.

For form submition, when creating and deleting a policy, I have decided to manually get and click the
submit button, instead of calling `cy.get('form').submit()`, to mimic the app's behavior when a user actually
fills the form inputs and tries to click submit.


Further Improvements:

- Improve policy checking. Check that the requested policy is created by querying all its properties, not just its name.
Similarly, the deletePolicy() function could query and delete a policy by other properties as well.

- Automate form filling. Write a function that takes a form type, such as "New Policy", as well an options object and automatically
fills the form input fields.

- Use safer selectors. Some selectors now rely on specific html structure, class names or text content. 
These are all subject to change during development, meaning that tests must be rewritten if such changes occur.
Safer selectors that are not as easy to change could be used instead, such as an element's id 
or a cypress specific "data" attribute value.

- Use constants for text, instead of string literals. Some assertions check for specific text content.
The texts for these assertions should be moved to constants, to avoid having to edit each test after text changes.

- Handle errors. More tests can be included that check for situations where an action is throwing an error,
such as when trying to create the same policy twice.
