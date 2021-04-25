
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',


});
export const html = (code, voucher, date) => {
  return (
    `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
     
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>A Simple Responsive HTML Email</title>
      <style type="text/css">
      body {margin: 0; padding: 0; min-width: 100%!important;}
      img {height: auto;}
      .content {width: 100%; max-width: 600px;}
      .grad-back {background: rgba(52, 9, 82, 0.2);
                  background: linear-gradient(90deg, rgba(131,58,180,0.6) 21%, rgba(253,29,29,0.6) 61%, rgba(252,176,69,0.6) 89%);}
      .header {padding: 40px 30px 20px 30px;}
      .innerpadding {padding: 30px 30px 30px 30px;}
      .borderbottom {border-bottom: 1px solid #f2eeed;}
      .subhead {font-size: 20px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}
      .h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}
      .h1 {font-size: 33px; line-height: 38px; font-weight: bold;}
      .h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}
      .bodycopy {font-size: 16px; line-height: 22px;}
      .button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px; }
      .button a {color: #ffffff; text-decoration: none; }
      .footer {padding: 20px 30px 15px 30px;}
      .footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}
      .footercopy a {color: #ffffff; text-decoration: underline;}
    
      @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
      body[yahoo] .hide {display: none!important;}
      body[yahoo] .buttonwrapper {background-color: transparent!important;}
      body[yahoo] .button {padding: 0px!important; border-radius: 8px;}
      body[yahoo] .button a {background-color: #e55573; padding: 15px 15px 13px!important; border-radius: 8px;}
      body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #2f3942; border-radius: 8px; text-decoration: none!important; font-weight: bold;}
      }
    
      /*@media only screen and (min-device-width: 601px) {
        .content {width: 600px !important;}
        .col425 {width: 425px!important;}
        .col380 {width: 380px!important;}
        }*/
    
      </style>
    </head>
    
    <body yahoo bgcolor="#f6f8f1">
    <table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <!--[if (gte mso 9)|(IE)]>
          <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
        <![endif]-->     
        <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="grad-back" class="header">
              <table width="70" align="left" border="0" cellpadding="0" cellspacing="0">  
                <tr>
                  <td height="70" style="padding: 0 20px 20px 0;">
                  <img src="https://firebasestorage.googleapis.com/v0/b/vouchy-3122b.appspot.com/o/vouchy.png?alt=media&token=67f4c3bc-f58a-430b-afeb-b568b0a30d14" width="80" height="90" alt="">
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
                <table width="425" align="left" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
              <![endif]-->
              <table class="col425" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 425px;">  
                <tr>
                  <td height="70">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="subhead" style="padding: 0 0 0 3px;">
                          HELLO
                        </td>
                      </tr>
                      <tr>
                        <td class="h1" style="padding: 5px 0 0 0;">
                          <span style="color: white"> Thanks for purchasing</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <tr>
            <td class="innerpadding borderbottom">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="h2">
                    ${voucher.title}
                  </td>
                </tr>
                <tr>
                  <td class="bodycopy">
                  ${voucher.brand}
                  </td>
                </tr>
                <tr>
                  <td class="bodycopy">
                  ${date}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="innerpadding borderbottom">
              <table width="115" align="left" border="0" cellpadding="0" cellspacing="0">  
                <tr>
                  <td height="115" style="padding: 0 20px 20px 0;">
                    <img class="fix" src="https://firebasestorage.googleapis.com/v0/b/vouchy-3122b.appspot.com/o/icon.png?alt=media&token=5f30c38a-9980-4361-91ef-66f45528b9c2" width="115" height="115" border="0" alt="" />
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
                <table width="380" align="left" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
              <![endif]-->
              <table class="col380" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 380px;">  
                <tr>
                  <td>
                    <span class="h2">${voucher.description}</span>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="bodycopy">
                        Price: ${formatter.format(voucher.price)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 0 0 0;">
                          <table class="buttonwrapper" bgcolor="#e55573" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td class="button round-button"  height="45">
                                <a href="#">Code: ${code.code}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <tr>
            <td class="innerpadding borderbottom">
              <img class="fix" src="https://firebasestorage.googleapis.com/v0/b/vouchy-3122b.appspot.com/o/abcdx.png?alt=media&token=c9f73d13-4401-429e-b9f8-62305238f92a" width="100%" border="0" alt="" />
            </td>
          </tr>
          <tr>
            <td class="innerpadding bodycopy">
              Thank you for purchasing our vouchers! We wish you have a good day
            </td>
          </tr>
          <tr>
            <td class="footer; grad-back" >
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" class="footercopy">
                    &reg; Vouchy - RMIT University Vietnam<br/>
                    <a href="#" class="unsubscribe"><font color="#ffffff">Unsubscribe</font></a> 
                    <span class="hide">Group 2</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0 0 0;">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="37" style="text-align: center; padding: 0 10px 0 10px;">
                          <a href="http://www.instagram.com/">
                            <img src="https://firebasestorage.googleapis.com/v0/b/vouchy-3122b.appspot.com/o/instagram.png?alt=media&token=3946d862-9508-49df-9d6a-6f111d4d9a18" width="37" height="37" alt="Facebook" border="0" />
                          </a>
                        </td>
                        <td width="37" style="text-align: center; padding: 0 10px 0 10px;">
                          <a href="http://www.twitter.com/">
                            <img src="https://firebasestorage.googleapis.com/v0/b/vouchy-3122b.appspot.com/o/twitter.png?alt=media&token=5b91e4fd-e4d3-4126-9bb4-d92b7a4dbd5f" width="37" height="37" alt="Twitter" border="0" />
                          </a>
                        </td>
                        <td width="37" style="text-align: center; padding: 0 10px 0 10px;">
                          <a href="http://www.facebook.com/">
                            <img src="https://firebasestorage.googleapis.com/v0/b/vouchy-3122b.appspot.com/o/facebook.png?alt=media&token=2150b2ee-0d1f-48d4-8834-69b1c2eab83e" width="37" height="37" alt="Facebook" border="0" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
              </td>
            </tr>
        </table>
        <![endif]-->
        </td>
      </tr>
    </table>
    
    </body>
    </html>
 
        `
  )
}