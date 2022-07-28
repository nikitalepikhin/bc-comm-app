# Communication App - NestJS Backend

## Generating a Self-Signed SSL Certificate

Credit: [Stack Overflow](https://stackoverflow.com/a/49784278)

1. Create a `.cert` folder inside the `nest-backend` directory.
2. Create a `req.cnf` file with the following contents:

```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
C = CZ
ST = Prague
L = Prague
O = Nikita Lepikhin
OU = Nikita Lepikhin
CN = www.commapp.com
[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = www.commapp.com
DNS.2 = commapp.com
DNS.3 = commapp
```

3. Generate a public and private key pair `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256`.
4. Open the backend url in Chrome and export the certificate to a `cert.crt` file.
   1. On macOS:
      1. Open the certificate (SSL lock or security tab inside dev tools).
      2. Drag it to an open TextEdit window. Must be in plain text mode!
      3. Save as a `cert.crt` file inside the `.cert` folder.
      4. Install the certificate **private** key (cert.pem) into the Keychain Access app.
      5. Select `Always trust` for all options inside the `Trust` tab.
      6. Confirm the changes.
      7. Restart your browser.
5. You should now be able to open any backend URL and the certificate should show as trusted.
   1. On Windows:
      1. ...