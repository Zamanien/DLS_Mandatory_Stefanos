# Profiling example

## Run the app

```
npm i
NODE_ENV=production node --prof app.js

```

## Run benchmarking

Install apache benchmark:

- windows: https://www.cedric-dumont.com/2017/02/01/install-apache-benchmarking-tool-ab-on-windows/
- ubuntu: `sudo apt install apache2-utils`

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"

```

## Proccess the profiler output for readability

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

**source** [tutorial](https://nodejs.org/en/docs/guides/simple-profiling/)
