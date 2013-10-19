function send_email(from_name, from_email, subject, message) {
  $.ajax({
    type: "POST",
    processData: true,
    dataType: "json",
    url: "https://sendgrid.com/api/mail.send.json",
    data: {
      api_user: "michaelminter",
      api_key: "nospmoh875",
      to: "mothore@gmail.com",
      toname: "Michael Minter",
      subject: subject,
      text: message,
      from: from_email
    },
    success: function (data) {
      processData(data);
    }
  });
}

function processData(data) {
  alert(data);
}
