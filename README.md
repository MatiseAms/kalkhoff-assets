# kalkhoff-assets


Start with:

- npm install
- composer install

Then to generate less and sass assets/sources:

`npm run build`

For development/watch you can run the build with watch by using:

`npm run dev`

And to test less and sass sources:

`npm run test`

## Icon Fonts

In order to make the icon font generation work, you will need to install a few dependencies local on your device:

Make sure you installed brew

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Install the software to generate icons:

`brew install batik fontforge ttfautohint ttf2eot`


### Combined settings

Most settings are defined in the settings folder (json files). All these settings get automatically converted into less and scss settings. Make sure to
use these files in order to keep consistency

## Rules 🤡
For class naming, use strict bem naming (`.{{block}}__{{element}}--{{modifier}}`), if you don't we will chase you till the end of time! More info: http://getbem.com/naming/
