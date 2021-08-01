# Fable.I18Next

Fable bindings and helpers for [i18next](https://www.i18next.com/). The bindings work with Fable and on .NET Core for ServerSide-Rendering.

Created by [@atheck](https://github.com/atheck).

## Installation

```
npm install --save i18next # or
yarn add i18next

paket add Fable.I18Next --project [yourproject]
```

## Usage

Make sure your Fable project .fsproj has the `FABLE_COMPILER` property set:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <DefineConstants>FABLE_COMPILER</DefineConstants>
  </PropertyGroup>
  <ItemGroup>
    // ...
    <Compile Include="App.fs" />
  </ItemGroup>
</Project>
```

Create a `translations.json` file like the following:

```json
{
    "de": {
        "translation": {
            "MyKey": "Das ist ein deutscher Text"
        }
    },
    "en": {
        "translation": {
        "MyKey": "This is a english text"
        }
    }
}
```

Hook in Fable.I18Next in your Elmish Program inside App.fs:

```fs
module App

open Fable.Core.JsInterop

// ...

let resources : obj = import "*" "./translations.json"

promise {
    do! I18n.Init(resources,"en")
    Program.run program
}
|> Promise.start


```

If you want to access the translation then just use:

```fs

open Fable.I18Next

I18n.Translate "MyKey"

```

If you want to switch the language then use the `I18n.ChangeLanguage`. If you use Elmish then you can put it into a Cmd:

```fs

open Fable.I18Next

let update msg model =
    match msg with
    // ...
    | ChangeLanguage newLanguage ->
        model, Cmd.OfPromise.either I18n.ChangeLanguage newLanguage LanguageChanged Error
    // ...

```

### Usage on .NET Core

```fs
let resourceFileName =
    let app = System.Reflection.Assembly.GetExecutingAssembly().Location
    let startupPath = System.IO.Path.GetDirectoryName app
    Path.Combine(startupPath, "translations.json")

I18n.Init(resourceFileName, initialLang)
```

Please read the [i18next docs](https://www.i18next.com/) for more sophisticated examples.

## Release process

After installing dependencies with `yarn install`, run `yarn run build publish` to publish a new package
