<div align="center">
  <h1>starlight-ui-strings-cli 🧵</h1>
  <p>CLI utility to quickly add, update or delete Starlight UI strings in all translation files.</p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/starlight-ui-strings-cli/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/starlight-ui-strings-cli/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/starlight-ui-strings-cli/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/starlight-ui-strings-cli" />
  </a>
  <br />
</div>

> [!NOTE]  
> This CLI utility is designed to be only used by [Starlight](https://starlight.astro.build/) maintainers when dealing with UI strings.

## How to use

To get started, make sure you are at the root of the Starlight monorepo or in the `packages/starlight/` directory.

### Add a new UI string

To add a new UI string at the end of all translation files, run the following command:

```sh
pnpm dlx @hideoo/starlight-ui-strings-cli --add new.string --value "my new string"
```

To add a new UI string after an existing one in all translation files, run the following command:

```sh
pnpm dlx @hideoo/starlight-ui-strings-cli --add new.string --value "my new string" --after existing.string
```

### Update an existing UI string

To update an existing UI string (if it exists) in all translation files, run the following command:

```sh
pnpm dlx @hideoo/starlight-ui-strings-cli --update existing.string --value "my updated string"
```

### Delete an existing UI string

To delete an existing UI string (if it exists) in all translation files, run the following command:

```sh
pnpm dlx @hideoo/starlight-ui-strings-cli --delete existing.string
```

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/starlight-ui-strings-cli/blob/main/LICENSE) for more information.
