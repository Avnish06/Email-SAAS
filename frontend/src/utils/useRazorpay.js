/**
 * useRazorpay – custom hook that dynamically loads the Razorpay checkout script
 * and exposes an `openRazorpay(options)` function.
 */
const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = RAZORPAY_SCRIPT_URL;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * @param {Object} options  – Razorpay checkout options (amount, currency, order_id, etc.)
 * @returns {Promise}       – resolves with payment response on success, rejects on failure/dismiss
 */
export async function openRazorpay(options) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error("Razorpay SDK failed to load. Check your internet connection.");
  }

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      ...options,
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled by user.")),
      },
    });
    rzp.on("payment.failed", (response) => reject(response.error));
    rzp.open();
  });
}
