---
layout: post
title: "Paypal Express Checkout NVP API"
author: '<a href="/" target="_blank" alt="Homepage" title="Michael Minter">Michael Minter</a>'
date: 2010-04-03 20:19
comments: true
categories: [PHP, API]
---

I'm not sure why [Paypal](http://paypal.com) has written documentation, regarding its own Express Checkout name-value-pair API, with no enthusiasm at all. The classes used with the Paypal API are extremely easy to use. All of this is likely contributing to the confusion about using Express Checkout. But I’m here now, to save your application, and hopefully your sanity.

<!--more-->

<div style="margin:0 auto 20px;width:600px;"><img src="/images/posts/checkout01.jpg" title="SendGrid" alt="SendGrid" width="100%" /></div>

I’m going to explain why the API objects work and what happens when they’re called. There’s a few different ways that you could go about setting up the product and/or service details. So I’ll keep this post relative to the main focus points and let you handle the before and after parts on an individual basis.

##Referring payment authentication

``` perl
$paypal = new SetExpressCheckout($totalPrice);
```

We start out by calling the **SetExpressCheckOut()** class. This class caller instantiates the method you’ll use to set up the parameters required for redirecting the customer *to* Paypal *and back*. A variable of the total price has to be set to complete the initiation of this class.

``` perl
$paypal = new SetExpressCheckout($totalPrice);

$paypal->setNVP("RETURNURL", "http://yourURL.com/confirm.php");
$paypal->setNVP("HDRIMG", "http://yourURL.com/image.jpg");
$paypal->setNVP("EMAIL", "$userEmail"); // customer's email
$paypal->setNVP("AMT", $totalPrice);
$paypal->setNVP("SHIPPINGAMT", "32");
$paypal->setNVP("CUSTOM", "Anything you want to put");
$paypal->setNVP("INVNUM", $uniqueID); // personal invoice number

$paypal->getResponse();
```

Before you submit for a transfer to Paypal, know that there are optional values you can send with the setNVP() function, to customize the payment process. All values that can be found, by default, in the etc/NVP/SetExpressCheckout.ini file. I’ve included a list of common practice examples and how to use them in this template.

getResponse() sends the user’s browser to Paypal for authentication of credit information. Specifically to a URL that you’ll have to variably set between test mode (sandbox) and live, in the file named etc/NVP/PayPalNVP.ini.

<div style="margin:0 auto 20px;width:600px;"><img src="/images/posts/checkout02.jpg" title="SendGrid" alt="SendGrid" width="100%" /></div>

##Completing the Sale

``` perl
$paypal  = new GetExpressCheckoutDetails;
$details = $paypal->getResponse();
```

**GetExpressCheckoutDetails()** is a class that is most responsible for presenting the custom specifications that you originally sent with SetExpressCheckOut() and SetNVP().

**getResponse()** will gather all of the available options as an array, labelled $details.

``` perl
$payment  = new DoExpressCheckoutPayment($totalPrice);
$response = $payment->getResponse();
```

**DoExpressCheckoutPayment()** will instinctively initiate a communication with Paypal to notify the service that you are ready for the payment to be transferred to your account. The only necessary requisite, of calling this class and it calling to action, is to include the total price in its variable containment field.

**getResponse()** will gather the resulting responses by DoExpressCheckoutPayment() and include them in an array, labelled $response.

It could be said that you could apply another (final) verification for your customer to submit before the transaction is completed by DoExpressCheckoutPayment(). But not technically necessary.

``` perl
if ($response['PAYMENTSTATUS'] == 'Completed') {
    # process information
}
```

One of the returned values in $response will be the PAYMENTSTATUS key. This is a string result that confirms whether or not the money has made been payed to your account. It will definitely be useful when you set up your system to print an invoice on complete, or some insightfully-formatted summary on failure.

##Displaying results from getResponse

``` perl
echo '<pre>';
print_r($details);
echo '<pre>';
print_r($response);

# The above code should print out something similar to the following:

Array
(
    [TOKEN] => EC%2d8DS53628GJ4630109
    [TIMESTAMP] => 2010%2d03%2d31T08%3a25%3a40Z
    [CORRELATIONID] => ce3e460d38d2f
    [ACK] => Success
    [VERSION] => 51%2e0
    [BUILD] => 1247606
    [EMAIL] => test_acct_36654645742_per%40domain%2ecom
    [PAYERID] => W96GXTA5P9BRN
    [PAYERSTATUS] => verified
    [FIRSTNAME] => Test
    [LASTNAME] => User
    [COUNTRYCODE] => US
    [SHIPTONAME] => Test%20User
    [SHIPTOSTREET] => 1%20Main%20St
    [SHIPTOCITY] => San%20Jose
    [SHIPTOSTATE] => CA
    [SHIPTOZIP] => 95131
    [SHIPTOCOUNTRYCODE] => US
    [SHIPTOCOUNTRYNAME] => United%20States
    [ADDRESSSTATUS] => Confirmed
    [CUSTOM] => Anything you want to put
    [INVNUM] => IYUUFEOAS0ME3MTI
)
Array
(
    [TOKEN] => EC%2d8DS53628GJ4630109
    [TIMESTAMP] => 2010%2d03%2d31T08%3a25%3a43Z
    [CORRELATIONID] => b1989df39a0ca
    [ACK] => Success
    [VERSION] => 51%2e0
    [BUILD] => 1247606
    [TRANSACTIONID] => 1PR0061154034542X
    [TRANSACTIONTYPE] => expresscheckout
    [PAYMENTTYPE] => instant
    [ORDERTIME] => 2010%2d03%2d31T08%3a25%3a42Z
    [AMT] => 152%2e00
    [FEEAMT] => 4%2e71
    [TAXAMT] => 0%2e00
    [CURRENCYCODE] => USD
    [PAYMENTSTATUS] => Completed
    [PENDINGREASON] => None
    [REASONCODE] => None
)
```

##Testing

If you don’t have a [Paypal developer account](https://developer.paypal.com/), than you should certainly sign up for one to use Paypal’s Sandbox, which makes a mock version of Paypal available for testing. Comes complete with personal and business accounts, each with their own credentials, and unlimited funds.

##Summary

Follow the preceding order and you could easily narrow this code down to a a single file, with enough if() constructs, or span it out to many.

You might be left wondering why it seems less daunting than you have expected. That would be because you’re right. These few objects are all that’s needed to handle a shopping cart system on your website.

Maybe Paypal will use this post to refer new users trying to understand how this system works. But I doubt it.

###Note

Don't forget to adjust your database schema for *address2* in **$details** when available.
