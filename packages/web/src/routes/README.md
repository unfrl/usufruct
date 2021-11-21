# Routes

Note that this directory does not have an `index.ts` file that exports its contents. **This is intentional!** All routes should have a `default` export so that they can be asynchronously imported via `React.lazy(() => ...)`.
