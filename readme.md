## change code in the front (mlcv)
### this is a work-around because we only have one port
- add "homepage": "g11/" to package.json in front end project
- npm run-script build
- copy build folder to client/build in mlcv_backend
- node Mail.js

cv is at localhost:10011