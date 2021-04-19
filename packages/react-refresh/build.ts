import * as path from 'path'
import * as fs from 'fs'

const ModuleName = 'react-refresh'
const version = '0.10.0-rc.0'

const PackageConfigFilePath = path.resolve(__dirname, 'package.build.json')
const BuildDirectory = path.resolve(__dirname, 'dist')
const PackageConfigWriteFilePath = path.join(BuildDirectory, 'package.json')
const TypesFilePath = path.join(BuildDirectory, 'types')

const TypeFileNames: string[] = [
]

async function main() {
  const pkg = fs.readFileSync(PackageConfigFilePath, 'utf-8')
  fs.writeFileSync(PackageConfigWriteFilePath, pkg.replace('VERSION', version))
  fs.mkdirSync(TypesFilePath, { recursive: true })

  TypeFileNames.forEach(filename => {
    const filepath = require.resolve(`@types/${ModuleName}/${filename}`) 
    const distpath = path.join(TypesFilePath, filename)
    if(!fs.existsSync(path.dirname(distpath))) fs.mkdirSync(path.dirname(distpath), { recursive: true })
    fs.copyFileSync(filepath, distpath)
  })
  
}

main()
