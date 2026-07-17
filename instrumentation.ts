export async function register() {
  // بعض شبكات الـVPN تكسر أو تحجب IPv6، بينما يتعافى المتصفح بسرعة عبر Happy Eyeballs.
  // Node.js لا يملك نفس آلية الاستعادة، فقد يعلّق عند محاولة الاتصال بـ Accelerate عبر IPv6.
  // نجبره على تفضيل IPv4 أولاً لتفادي ذلك.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("dns");
    dns.setDefaultResultOrder("ipv4first");
  }
}
