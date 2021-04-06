import * as path from 'path'
import * as fs from 'fs'
import { version } from 'react'

const PackageConfigFilePath = path.resolve(__dirname, 'package.react.json')
const BuildDirectory = path.resolve(__dirname, 'dist')
const PackageConfigWriteFilePath = path.join(BuildDirectory, 'package.json')
const TypesFilePath = path.join(BuildDirectory, 'types')

const TypeFileNames = [
  'experimental.d.ts',
  'global.d.ts',
  'index.d.ts',
  'jsx-dev-runtime.d.ts',
  'jsx-runtime.d.ts',
]

async function main() {
  const pkg = fs.readFileSync(PackageConfigFilePath, 'utf-8')
  fs.writeFileSync(PackageConfigWriteFilePath, pkg.replace('VERSION', version))
  fs.mkdirSync(TypesFilePath, { recursive: true })

  TypeFileNames.forEach(filename => {
    const filepath = require.resolve(`@types/react/${filename}`) 
    fs.copyFileSync(filepath, path.join(TypesFilePath, filename))
  })
  
}

main()
