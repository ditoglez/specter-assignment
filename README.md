# Spectre tech assignment

This project has been developed with [Remix](https://remix.run/docs) and configured to be deployed to [Vercel](https://vercel.com/).

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Create a new file named `.env` and add the needed variables in it:

```sh
API_BASE_URL=<API_BASE_URL>
PROJECT_URL=<PROJECT_URL>
PROJECT_API_KEY=<PROJECT_API_KEY>
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

## TODO

- [ ] Add sorting on the feed (state should be preserved on page reload)
- [ ] Add filtering on the feed (state should be preserved on page reload)
- [ ] Preserve loaded items on page reload
- [ ] Implement virtual scroll in order to get better performance
- [ ] Render signal details like web visits, alexa rank, pages per visit using charts
- [ ] Proper builds
