document.querySelector('button').addEventListener('click', redirectToForm);

async function redirectToForm() {
  const merchantKey = "key-8edd04c2ffccf82280fa36a65d999c49";
  const authToken = "c81a1ac53bf3b7e553583a7cd2f542f92ad50671";
  const orderNumber = Math.floor(Math.random() * 1000000).toString();
  const amount = 10050;
  const currency = 'BAM';

  const encoder = new TextEncoder();
  const dataToHash = merchantKey + orderNumber + amount + currency;
  const buffer = encoder.encode(dataToHash);
  const hashBuffer = await crypto.subtle.digest('SHA-512', buffer);
  const digest = Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');


  const data = {
    "utf8": "✓",
    "authenticity_token": authToken,
    "ch_full_name": "Harun Kološ",
    "ch_address": "Džemala Bijedića 2",
    "ch_city": "Sarajevo",
    "ch_zip": "71000",
    "ch_country": "BIH",
    "ch_phone": "+38761222333",
    "ch_email": "redirect-integration-test@monri.com",
    "order_info": "Redirect Integration Demo",
    "amount": amount,
    "order_number": orderNumber,
    "currency": currency,
    "transaction_type": "purchase",
    "number_of_installments": "",
    "cc_type_for_installments": "",
    "installments_disabled": "false",
    "force_cc_type": "",
    "supported_cc_issuers": "",
    "rules": "",
    "moto": "false",
    "force_installments": "false",
    "digest": digest,
    "language": "hr",
    "tokenize_pan_until": "",
    "custom_params": "{a:b,c:d}",
    "tokenize_pan": "",
    "tokenize_pan_offered": "",
    "tokenize_brands": "",
    "supported_payment_methods": "",
    "custom_attributes": "",
    "success_url_override": "",
    "callback_url": "https://monri.com/",
    "cancel_url": "https://monri.com/"
  };

  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'https://ipgtest.monri.com/v2/form';

  Object.entries(data).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}
