Forked for internal company use. To catch up-to-speed with upstream changes:

```
git fetch upstream
git merge upstream/stable
```

To release, first run `npm run build` then run `npm publish` in the `packages/ckeditor5-build-classic` directory.

Relevant docs: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html.
