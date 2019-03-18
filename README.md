# eventshuffle
eventshuffle implementation with Nodejs and TypeScript.

## requirements
Nodejs version v10.15.3 

## how to run
clone repository
```
git clone https://github.com/helgrima/eventshuffle.git
```

install dependencies
```
npm install
```

install typescript
```
npm install typescript -g
```

build typescript files
```
tsc
```

## running
before running make sure that config/default.json has correct database name and file.
**NOTE**  when running for very **first** time make sure that "Sync" option in default.json is set to **true**
After first run, "Sync" can be set to **false**. "Sync" option will initialize database, ie. create tables.
```
node dist\app.js
```

