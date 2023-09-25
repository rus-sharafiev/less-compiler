# Standalone LESS compiler

CLI tool that uses original [Less.js](https://lesscss.org/) compiler (v4.2.0) but running inside [Deno](https://deno.com/) compiled app.  
Minimal changes were made to the compiler source code:
- added file extensions in import (required for Deno)
- fs, URL and path are replaced with the same ones from Deno Std. Library 0.202.0

Unlike the original `lessc`, the Node is not required.

## Usage
Install [Deno](https://docs.deno.com/runtime/manual/getting_started/installation), pick compiler type, for CLI tool run
```
deno compile --allow-read --allow-write less-compiler-cli.ts
```
...for stdout run
```
deno compile --allow-read less-compiler-stdout.ts
```

### CLI tool  
Run the app, answer questions and get the CSS file (example for PowerShell)
```
PS C:\less> .\less-compiler-cli.exe
Standalone LESS compiler v1.0.0

Set source file location: test/index.less
Set outfile folder: ./ 
Set outfile name: out
Done!

Press any key to exit...
```

### Stdout (created for the [React development server](https://github.com/rus-sharafiev/dev-server))
Run app with a LESS file path as arg and get the plain css in stdout (example for PowerShell)
```
PS C:\less> .\less-compiler-stdout.exe test/index.less
```
