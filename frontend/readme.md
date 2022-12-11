# Web Application for Anonymous Communication Between Students and Teachers

## Front End Application

### Installing a self-signed SSL certificate on localhost

0. Map `commapp.com` to localhost by adding the following line to the system's `hosts` file:

```
127.0.0.1    commapp.com   www.commapp.com
```

1. Install `mkcert` (for macOS run `brew install mkcert`)
2. Set up `mkcert` by running `mkcert -install`, this will install a local CA
3. Run `mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"` to generate a certificate + key pair inside the `.cert` folder
4. Add the following lines to the `.env` file:

```
HTTPS=true
PORT=443
HOST="commapp.com"
SSL_CRT_FILE=.cert/cert.crt
SSL_KEY_FILE=.cert/cert.key
```

### Running a local production build over HTTPS

```
serve -s build -p 443 -l tcp://commapp.com:443 --no-port-switching --ssl-cert  ./.cert/cert.pem --ssl-key ./.cert/key.pem
```
