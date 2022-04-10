# Communication App Back-end Notes

## Local SSL Certificate Generation

1. If a local CA does not exist, then generate it by running `mkcert -install`, else skip this step
2. Run `mkcert -pkcs12 <domain>` to generate a locally signed certificate
3. Place the generated certificate into the folder that you have specified inside the `applications.properties`