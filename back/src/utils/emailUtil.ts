import nodemailer from "nodemailer";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport({
  service: "gmail", //사용하고자 하는 서비스
  port: 587,
  host: "smtp.gmail.com",
  secure: true, // true for 587, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_ID, // gmail 주소
    pass: process.env.GMAIL_PASSWORD, // gmail 패스워드 혹은 앱 비밀번호
  },
});

interface expirationData {
  user_name: string;
  email: string;
  encryptedToken: string;
}

const emailUtil = {
  expirationEmail: async (data: expirationData) => {
    const pageLink = `${process.env.APP_MODE}:${process.env.FRONT_PORT}/m/subscribe?token=${data.encryptedToken}`;
    const encodedPageLink = encodeURIComponent(
      `${process.env.APP_MODE}:${process.env.FRONT_PORT}/m/subscribe?token=${data.encryptedToken}`,
    );
    const QRcode = `https://quickchart.io/qr?text=${encodedPageLink}&ecLevel=L&size=200&centerImageUrl=https://ifh.cc/g/Y4Z5z3.png`;

    await transporter
      .sendMail({
        from: process.env.GMAIL_ID, // 보내는 주소 입력
        to: data.email, // 위에서 선언해준 받는사람 이메일
        subject: `안녕하세요, Pill my rhythm 서비스입니다.`, // 메일 제목
        // 내용
        html:
          `<div style="display: grid; justify-content: center; align-items: center; width: 100%; height: 100%">` +
          `<br />` +
          `<p style="color: black"><b>${data.user_name}</b>님 안녕하세요, 회원님의 구독 정보가 <b>만료</b>되었습니다.</p>` +
          `<p style="color: black">저희의 서비스에 만족하셨다면 아래의 재구독 버튼이나 QR 코드로 접속하여 다시 <b>구독 버튼</b>을 눌러주세요.</p>` +
          `<br />` +
          `<div style="width: 620px; height: 250px; border: 4px solid #00dfd7; border-radius: 4px">` +
          `<br /><div style="padding-left: 250px">
            <p><a href='${pageLink}' target="_blank"><button style="color: #268c88; border: 0px; border-radius: 4px; width: 88pt; height: 20pt">
            <b>재구독하러 가기</b>
            </button></a></p>` +
          `<img src=${QRcode} alt="QRcode" width="120" height="120" /></div>` +
          `<div style="padding-left: 180px"><p style="color: #8f8f8f; font-size: 9px">* QR 코드 접속은 Android에서만 가능합니다. (ios는 불가능)</p></div>` +
          `<br />
            </div>
            <br />
            </div>`,
      })
      .then((res) => {
        console.log(`${data.email}님께 재구독 요청 메일을 보냈습니다.`);
        if (res.rejected.length != 0) {
          console.log(`${res.rejected[0]}`);
        }
      });
  },
};

export { emailUtil };
