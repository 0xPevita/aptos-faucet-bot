const { Aptos, AptosConfig, Network, Account } = require("@aptos-labs/ts-sdk");
const fs = require("fs");

const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));

async function fundAccount(address, amount = 100_000_000) {
  try {
    const tx = await aptos.fundAccount({ accountAddress: address, amount });
    console.log(`✅ Funded ${address.slice(0, 12)}... → ${amount / 1e8} APT (tx: ${tx.hash?.slice(0, 16)}...)`);
    return { success: true, address, tx: tx.hash };
  } catch (e) {
    console.log(`❌ Failed ${address.slice(0, 12)}... → ${e.message}`);
    return { success: false, address, error: e.message };
  }
}

async function batchFund(addresses) {
  const results = [];
  for (const addr of addresses) {
    const result = await fundAccount(addr.trim());
    results.append(result);
    await new Promise(r => setTimeout(r, 500));
  }
  const ok = results.filter(r => r.success).length;
  console.log(`\n📊 ${ok}/${results.length} accounts funded`);
}

async function generateAndFund(count) {
  console.log(`🔑 Generating ${count} new wallets...\n`);
  for (let i = 0; i < count; i++) {
    const account = Account.generate();
    const address = account.accountAddress.toString();
    console.log(`Wallet ${i + 1}: ${address}`);
    console.log(`  Private key: ${account.privateKey.toString()}`);
    await fundAccount(address);
  }
}

async function main() {
  const [,, cmd, arg] = process.argv;
  if (cmd === "fund" && arg) return fundAccount(arg);
  if (cmd === "batch" && arg) {
    const addresses = fs.readFileSync(arg, "utf8").split("\n").filter(Boolean);
    return batchFund(addresses);
  }
  if (cmd === "generate" && arg) return generateAndFund(parseInt(arg));
  console.log("Usage: node index.js [fund <address>|batch <file>|generate <count>]");
}

main().catch(console.error);
