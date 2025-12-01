const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async function sendOrderEmail(order, toEmail) {
  try {
    const itemsHtml = order.items.map(i => `<p>${i.name} (${i.size}) x${i.qty} - ₹${i.price}</p>`).join('');
    const html = `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${order._id}</p>
      <p>Date: ${new Date(order.orderDate || order.createdAt).toLocaleString()}</p>
      <h3>Items:</h3>
      ${itemsHtml}
      <h3>Total: ₹${order.totalPrice}</h3>
      <p>We will notify you when your order ships.</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: `Order Confirmation - #${order._id}`,
      html
    });
    console.log('Order email sent to', toEmail);
  } catch (err) {
    console.error('Failed to send order email', err);
  }
};
