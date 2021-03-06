import { emptyDirSync } from 'https://deno.land/std@0.76.0/fs/mod.ts';

const examplesPath = "three.js/examples/jsm/";
const srcPath = "three.js/src/";
const pathToNewDir = "three.deno/";
// const filesForExampleModts: string[] = [];

function loopDirAndMatch(path: string, pattern: RegExp, callBack: Function) {
  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory) {
      loopDirAndMatch(`${path}${dirEntry.name}/`, pattern, callBack);
    } else {
      // look for matches files
      const match = dirEntry.name.match(pattern);
      if (match) {
        callBack(dirEntry.name, path);
      }
    }
  }
}

function updateScripts(fileName: string, path: string) {
  // update .js script imports with deno appropriate urls
  let data = Deno.readTextFileSync(`${path}${fileName}`);

  // match the import
  data = data.replaceAll(/import .+?;/gms, (m) => {
    m = m.replace(/build\/three.module.js/g, "src/Three.js");
    return m;
  });

  // As a simple fix for type errors that would otherwise occur
  // we'll add the following to all .js scripts:
  // `/// <reference lib="dom" />`
  data = data.replace(/^/, `/// <reference lib="dom" />\n`);

  // make sure each file references its own types.
  if (!data.includes("<reference types=")) {
    const fn = fileName.replace(/\.js/g, ".d.ts");
    if (existsSync(`${path}${fn}`)) {
      data = data.replace(/^/, `/// <reference types="./${fn}" />\n`);
    } else {
      // because it doesn't have its own types it's best to tell the deno's formatter to ignore it
      // includes folders like libs and ShaderChunk/glsl.js files
      data = data.replace(/^/, `// deno-fmt-ignore-file\n`);
    }
  }

  // if from the examples folder add to list for examples/mod.ts file
  // if (path.includes("examples/jsm")) {
  //   filesForExampleModts.push(`"\.${path.split("three.js/examples/jsm")[1]}${fileName}"`);
  // }

  // write the new text to the new path
  const newPath = createNewPath(path);

  Deno.mkdirSync(newPath, { recursive: true });
  Deno.writeTextFileSync(`${newPath}${fileName}`, data);
}

function updateTypescripts(fileName: string, path: string) {
  // update .d.ts script imports with deno appropriate urls
  let data = Deno.readTextFileSync(`${path}${fileName}`);

  // match imports
  data = data.replaceAll(/import .+?;/gms, (m) => {
    if (!m.includes(".d.ts")) {
      m = `${m.slice(0, m.length - 2)}.d.ts${m.slice(m.length - 2)}`;
    }
    return m;
  });

  // match exports
  data = data.replaceAll(/export \* from .+?;/gms, (m) => {
    if (!m.includes(".d.ts")) {
      m = `${m.slice(0, m.length - 2)}.d.ts${m.slice(m.length - 2)}`;
    }
    return m;
  });

  // As a simple fix for type errors that would otherwise occur
  // we'll add the following to all .d.ts scripts:
  // `/// <reference lib="dom" />`
  data = data.replace(/^/, `/// <reference lib="dom" />\n`);

  // write the new text into the new Dir
  const newPath = createNewPath(path);

  Deno.mkdirSync(newPath, { recursive: true });
  Deno.writeTextFileSync(`${newPath}${fileName}`, data);
}

function existsSync(path: string): boolean {
  try {
    Deno.lstatSync(path);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

function createNewPath(path: string) {
  return path.replace(/three\.js/g, "three.deno");
}

if (import.meta.main) {
  // ensure that the three.js directories that we care about are there
  if (!(existsSync(examplesPath) && existsSync(srcPath))) {
    // otherwise run `git clone --depth=1 https://github.com/mrdoob/three.js.git`
    const p = Deno.run({
      cmd: [
        "git",
        "clone",
        "--depth=1",
        "https://github.com/mrdoob/three.js.git",
      ],
    });
    await p.status();
  }

  // ensure that the three.deno directory is empty
  emptyDirSync(pathToNewDir)

  // Update .d.ts urls
  loopDirAndMatch(examplesPath, /\.d\.ts/g, updateTypescripts);
  loopDirAndMatch(srcPath, /\.d\.ts/g, updateTypescripts);

  // Update .js urls and add type references i.e. /// <reference types="..." />
  loopDirAndMatch(examplesPath, /\.js(?!on)/g, updateScripts);
  loopDirAndMatch(srcPath, /\.js(?!on)/g, updateScripts);

  // Create the three.deno/examples/jsm/mod.js file
  // let modFile = ""
  // filesForExampleModts.forEach(path => {
  //   modFile += `export * from ${path}\n`
  // });
  // Deno.writeTextFileSync(`${pathToNewDir}examples/jsm/mod.ts`, modFile)

  // run deno fmt over the three.deno folder
  console.log("formatting the three.deno folder");
  const p = Deno.run({
    cmd: ["deno", "fmt", "--log-level=debug", "three.deno"],
  });
  await p.status();
}
