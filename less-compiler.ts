import { dirname } from "https://deno.land/std@0.188.0/path/mod.ts"
import less from "./less/less-node/index.js"

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

(async () => {

    let css: string

    try {
        css = await Deno.readTextFile(Deno.args[0])
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            await Deno.stdout.write(new TextEncoder().encode('Deno error: The file was not found'))
            Deno.exit(1)
        } else {
            await Deno.stdout.write(new TextEncoder().encode('Deno error: ' + error))
            Deno.exit(1)
        }
    }

    const options = { paths: [dirname(Deno.args[0])] }
    less.render(css, options, async (error: RenderError, output: RenderOutput | undefined) => {
        if (error || !output) {
            await Deno.stdout.write(new TextEncoder().encode((`${error.message} in ${error.filename} on line ${error.line}`)))
            Deno.exit(1)
        }

        await Deno.stdout.write(new TextEncoder().encode(output.css))
        Deno.exit()
    })

})()