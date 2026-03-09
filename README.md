# aptos-faucet-bot

> Automate APT token funding for multiple Aptos testnet accounts.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Aptos](https://img.shields.io/badge/Aptos-blue?style=flat-square)

## Overview

Useful for testing BlobSafe and other Aptos dApps — fund multiple wallets in bulk for automated testing.

## Usage
```bash
npm install

# Fund a single address
node index.js fund 0xYourAddress

# Fund multiple from file
node index.js batch addresses.txt

# Generate + fund 5 new wallets
node index.js generate 5
```

## Output
✅ Funded 0x1234... → 1.00 APT (tx: 0xabc...)
✅ Funded 0x5678... → 1.00 APT (tx: 0xdef...)

## License
MIT
