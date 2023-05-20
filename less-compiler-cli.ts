import { dirname, join } from "https://deno.land/std@0.188.0/path/mod.ts"
import less from "./less-src/less-node/index.js"

// --------------------------------------------------------------------------------

interface RenderError {
    column: number
    extract: string[]
    filename: string
    index: number
    line: number
    message: string
    type: string
}

interface RenderOutput {
    css: string
    map: string
    imports: string[]
}

async function prompt(message: string) {
    const buf = new Uint8Array(1024)
    await Deno.stdout.write(new TextEncoder().encode(message))
    const n = <number>await Deno.stdin.read(buf)
    return new TextDecoder().decode(buf.subarray(0, n)).trim()
}

(async () => {

    const lessPath = await prompt('Standalone LESS compiler v0.0.1\n\nSet LESS file location: ')
    const outfileDir = await prompt('Set outfile directory: ')
    const outfileName = await prompt('Set outfile name: ')

    let lessFilePath: string
    try {
        lessFilePath = await Deno.readTextFile(lessPath)
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            return await Deno.stderr.write(new TextEncoder().encode('Deno error: The file was not found'))
        } else {
            throw error
        }
    }

    const options = { paths: [dirname(lessPath)] }
    less.render(lessFilePath, options, async (error: RenderError, output: RenderOutput | undefined) => {
        if (error || !output)
            return await Deno.stderr.write(new TextEncoder().encode(`${error.message} in ${error.filename} on line ${error.line}`))


        try {
            await Deno.writeFile(join(outfileDir, outfileName) + '.css', new TextEncoder().encode(output.css))
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                return await Deno.stderr.write(new TextEncoder().encode('Deno: Error wring the file'))
            } else {
                throw error
            }
        }

        await prompt('Done!\n\nPress any key to exit...')

    })

})()