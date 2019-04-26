# -*- coding: utf-8 -*-
import smtplib
from email.mime.text import MIMEText

# QQ邮件
mail_host = "smtp.qq.com"  # 设置服务器
mail_user = "1533165085@qq.com"    # 用户名
mail_pass = "kfcqwrxtqktabafh"   # 密码


def sendmail(option):
    message = MIMEText(option['html'], 'html', 'utf-8')
    message['Subject'] = option['subject']
    message['From'] = mail_user
    message['To'] = option['to']

    try:
        smtpObj = smtplib.SMTP(mail_host)
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(mail_user, option['to'], message.as_string())
        smtpObj.quit()
        print("邮件发送成功")
        return 1
    except smtplib.SMTPException:
        print("Error: 无法发送邮件")
        return 0


sendmail({'to': '1533165085@qq.com', 'subject': '邮件发送测试', 'html': '<p>邮件内容...</p>'})
