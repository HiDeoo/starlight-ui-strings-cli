import fs from 'node:fs/promises'
import path from 'node:path'
import util from 'node:util'

const starlightTranslationsPaths = [['packages', 'starlight', 'translations'], ['translations']]

async function main() {
  const translationsPath = await getStarlightTranslationsPath()

  if (!translationsPath) {
    console.error('Failed to find Starlight translations.')
    console.error(
      'Please run this script from the root of the Starlight repository or the `packages/starlight/` directory.',
    )
    process.exit(1)
  }

  try {
    const { values: args } = util.parseArgs({
      options: {
        add: {
          type: 'string',
          short: 'a',
        },
        delete: {
          type: 'string',
          short: 'd',
        },
        update: {
          type: 'string',
          short: 'u',
        },
        value: {
          type: 'string',
          short: 'v',
        },
      },
    })

    if (!args.add && !args.delete && !args.update) {
      throw new Error("You must specify either the '--add', '--delete', or '--update' option.")
    } else if (args.add && !args.value) {
      throw new Error("You must specify a value to add with the '--value' option.")
    } else if (args.update && !args.value) {
      throw new Error("You must specify a value to update with the '--value' option.")
    }

    if (args.add && args.value) {
      // TODO(HiDeoo)
      // await addTranslation(translationsPath, args.add, args.value)
    } else if (args.delete) {
      // TODO(HiDeoo)
      // await deleteTranslation(translationsPath, args.delete)
    } else if (args.update && args.value) {
      // TODO(HiDeoo)
      // await updateTranslation(translationsPath, args.update, args.value)
    } else {
      throw new Error('Invalid command.')
    }
  } catch (error) {
    console.error(`Failed to parse command line arguments: ${getErrorMessage(error)}`)
    process.exit(1)
  }
}

async function getStarlightTranslationsPath(): Promise<string | undefined> {
  for (const starlightTranslationsPath of starlightTranslationsPaths) {
    const translationsPath = path.join(...starlightTranslationsPath)

    try {
      await fs.access(translationsPath)
      return translationsPath
    } catch {
      // Ignore error and try next path.
    }
  }
  return
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

main().catch(console.error)
