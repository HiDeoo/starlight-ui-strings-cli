import fs from 'node:fs/promises'
import path from 'node:path'
import util from 'node:util'

import { globby } from 'globby'

const translationsDirs = [path.join('packages', 'starlight', 'translations'), path.join('translations')]

// TODO(HiDeoo) add after

async function main() {
  const translationsDir = await getTranslationsDir()

  if (!translationsDir) {
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
      await addTranslation(translationsDir, args.add, args.value)
    } else if (args.delete) {
      // TODO(HiDeoo)
      // await deleteTranslation(translationsDir, args.delete)
    } else if (args.update && args.value) {
      // TODO(HiDeoo)
      // await updateTranslation(translationsDir, args.update, args.value)
    } else {
      throw new Error('Unrecognized command.')
    }
  } catch (error) {
    console.error(`Failed to parse command line arguments: ${getErrorMessage(error)}`)
    process.exit(1)
  }
}

async function getTranslationsDir(): Promise<string | undefined> {
  for (const translationsDir of translationsDirs) {
    try {
      await fs.access(translationsDir)
      return translationsDir
    } catch {
      // Ignore error and try next path.
    }
  }
  return
}

async function addTranslation(translationsDir: string, key: string, value: string) {
  try {
    const translationFiles = await getTranslationFiles(translationsDir)

    for (const translationFile of translationFiles) {
      const data = await fs.readFile(translationFile, 'utf8')
      const content = JSON.parse(data) as Record<string, string>
      content[key] = value
      await fs.writeFile(translationFile, `${JSON.stringify(content, null, 2)}\n`)
    }
  } catch (error) {
    console.error(`Failed to add translation: ${getErrorMessage(error)}`)
    process.exit(1)
  }
}

function getTranslationFiles(translationsDir: string) {
  return globby('*.json', { absolute: true, cwd: translationsDir })
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

main().catch(console.error)