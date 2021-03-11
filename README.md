# zowe-sdk-smoke-test

Smoke test scripts to use when testing new Zowe releases

## CLI and Plugins

1. Install all packages:
    ```bash
    npm install -g zowe-cli.tgz
    zowe plugins install *-for-zowe-cli.tgz
    ```

1. Check output of the following:
    ```bash
    node --version
    npm --version
    zowe --version
    zowe plugins list
    ```

1. Create a profile with secure credentials and access z/OSMF with a token:
    ```bash
    zowe auth login apiml
    zowe profiles list base --sc
    zowe files ls ds SYS1.PARMLIB --base-path api/v1
    ```

## Node.js SDK

1. Ensure you have a default z/OSMF profile.
1. Navigate to the "nodejs" directory.
1. Install SDK packages and their dependencies (core, Imperative).
1. Run script `npm run test`.

## Python SDK

1. Ensure you have a z/OSMF profile.
1. Navigate to the "python" directory.
1. Install Python SDK packages.
1. Run script `python test.py <profileName> <iefbr14Dsn>`.
