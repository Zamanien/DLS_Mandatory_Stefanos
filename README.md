# Profiling example

## Run the app

Install dependencies

```
npm i

```

### Use the VS code Javascript Debug terminal

Opren the debugging terminal and run
```
node app.js

```
While the app is running you can chose to "Take Perforance Profile", click on the circle on the callstack on the side.

### Or run drectly with the node profiling option

```
npm i
NODE_ENV=production node --prof app.js

```

## Run benchmarking

Install apache benchmark:

- windows: https://www.cedric-dumont.com/2017/02/01/install-apache-benchmarking-tool-ab-on-windows/
- ubuntu: `sudo apt install apache2-utils`

First you need to create a user

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
```

Then you can authenticate, this is an expensive operation

```
curl -v -X GET  "http://localhost:8080/auth?username=matt&password=password"
```

Run this to benchamark:

```
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"

```

## Proccess the profiler output for readability

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

**source** [tutorial](https://nodejs.org/en/docs/guides/simple-profiling/)
