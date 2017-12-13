# kalkhoff-assets


Start with:

- npm install
- composer install

Then to generate less and sass assets/sources:

`npm run build`

And to test less and sass sources:

`npm run test`

## Icon Font

In order to make the icon font generation work, you will need to install a few dependencies local on your device:

Make sure you installed brew

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Install the software to generate icons:

`brew install batik fontforge ttfautohint ttf2eot`

To include icon font generation in the build use: 

`npm run build-with-fonts`
