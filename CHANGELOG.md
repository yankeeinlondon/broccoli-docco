#Changelog#
*for **master** branch*

##0.0.4
- First working version
- Uses a `spawn` approach to executing **docco** which isn't ideal but it works
- Allowing docco to write to the output directory rather than depend on the downstream Broccoli build process
- The idea is that the same documentation directory will be passed back into the build pipeline for potentially further processing (but this isn't working yet)

##0.0.0
- Just getting my hands around broccoli, not a working version