# Обновляем с еще более агрессивным SSL fix
import ssl
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.conf import settings
import os

def send_contact_email_direct(name, email, subject, message):
    """Отправка email с максимально агрессивным SSL fix"""
    try:
        print("📧 Attempting SMTP with aggressive SSL fix...")
        
        # Создаем SSL контекст с максимально отключенной проверкой
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        context.set_ciphers('DEFAULT@SECLEVEL=1')
        
        # Дополнительные настройки для Python 3.13
        try:
            context.minimum_version = ssl.TLSVersion.TLSv1
            context.maximum_version = ssl.TLSVersion.TLSv1_3
        except:
            pass
        
        # Подключаемся к SMTP серверу
        server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        
        # Создаем письмо
        msg = MIMEMultipart('alternative')
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = settings.EMAIL_HOST_USER
        msg['Subject'] = f'🔔 Portfolio Contact: {subject}'
        msg['Reply-To'] = email
        
        # HTML версия
        html_body = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">📧 New Portfolio Contact</h1>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #2d3748; margin-top: 0;">Contact Details</h2>
                    
                    <div style="margin: 20px 0;">
                        <p><strong>👤 Name:</strong> {name}</p>
                        <p><strong>📧 Email:</strong> {email}</p>
                        <p><strong>📝 Subject:</strong> {subject}</p>
                    </div>
                    
                    <div style="background: #edf2f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d3748; margin-top: 0;">💬 Message:</h3>
                        <p style="line-height: 1.6; color: #4a5568; white-space: pre-wrap;">{message}</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="mailto:{email}" style="background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Reply to {name}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        """
        
        # Текстовая версия
        text_body = f"""
New Portfolio Contact

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
Sent from portfolio contact form
        """
        
        msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
        msg.attach(MIMEText(html_body, 'html', 'utf-8'))
        
        # Отправляем
        server.sendmail(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_USER, msg.as_string())
        server.quit()
        
        print("✅ SMTP email sent successfully!")
        return True
        
    except Exception as e:
        print(f"❌ SMTP failed: {str(e)}")
        # Пробуем Resend API
        return send_email_via_resend(name, email, subject, message)

def send_email_via_resend(name, email, subject, message):
    """Отправка через Resend API"""
    try:
        print("🔄 Trying Resend API...")
        
        import requests
        
        api_key = os.getenv('RESEND_API_KEY')
        if not api_key:
            print("❌ RESEND_API_KEY not found")
            return False
            
        response = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'from': 'portfolio@resend.dev',
                'to': ['vitalivo@gmail.com'],
                'subject': f'🔔 Portfolio Contact: {subject}',
                'html': f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">📧 New Contact Form Submission</h2>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>👤 Name:</strong> {name}</p>
                        <p><strong>📧 Email:</strong> {email}</p>
                        <p><strong>📝 Subject:</strong> {subject}</p>
                    </div>
                    
                    <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h3 style="color: #374151; margin-top: 0;">💬 Message:</h3>
                        <p style="line-height: 1.6; color: #4b5563; white-space: pre-wrap;">{message}</p>
                    </div>
                </div>
                """,
                'reply_to': email
            },
            timeout=10
        )
        
        if response.status_code == 200:
            print("✅ Resend API email sent successfully!")
            return True
        else:
            print(f"❌ Resend API failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Resend API error: {str(e)}")
        return False
