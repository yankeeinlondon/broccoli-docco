#Changelog#
*for **master** branch*

## 0.0.7 ##

- `Fix`: The compromise of NOT passing back a tree to Broccoli in `0.0.6` was a pretty bad compromise, this release addresses this ... good plugin behavior at last
- `Fix`: Due to the above improvement, Docco's direct output will be pointed to a temporary directory and cleaned up as soon as the tree is passed to broccoli
- `Comment`: In many ways this just means that this plugin will behave like a normal plugin
- `Fix` Also ... made it so that *default values* are working, no parameters needed
- `Update`: updated README to reflect current release

## 0.0.6 ##
- Updated README.md to accurately reflect the current state

##0.0.5
- Removed MD URLs from description in package.json

##0.0.4
- First working version
- Uses a `spawn` approach to executing **docco** which isn't ideal but it works
- Allowing docco to write to the output directory rather than depend on the downstream Broccoli build process
- The idea is that the same documentation directory will be passed back into the build pipeline for potentially further processing (but this isn't working yet)

##0.0.0
- Just getting my hands around broccoli, not a working version