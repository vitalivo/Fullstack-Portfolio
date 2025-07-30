# Создай этот файл для тестирования только email
import os
import django
import ssl
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.conf import settings

def test_email_with_aggressive_ssl_fix():
    """Тест email с максимально агрессивным SSL fix"""
    print("🔧 Testing email with aggressive SSL fix...")
    
    try:
        # Создаем SSL контекст с максимально отключенной проверкой
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        context.set_ciphers('DEFAULT@SECLEVEL=1')
        
        # Дополнительные настройки для обхода проблем Python 3.13
        try:
            context.minimum_version = ssl.TLSVersion.TLSv1
            context.maximum_version = ssl.TLSVersion.TLSv1_3
        except:
            pass
        
        print(f"📧 Connecting to {settings.EMAIL_HOST}:{settings.EMAIL_PORT}")
        print(f"🔑 Using credentials: {settings.EMAIL_HOST_USER}")
        
        # Подключаемся к SMTP серверу
        server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server.set_debuglevel(1)  # Включаем детальную отладку
        server.ehlo()
        
        print("🔒 Starting TLS with custom SSL context...")
        server.starttls(context=context)
        server.ehlo()
        
        print("🔑 Logging in...")
        server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        
        # Создаем простое письмо
        msg = MIMEMultipart()
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = settings.EMAIL_HOST_USER
        msg['Subject'] = "🧪 Portfolio Contact Test - SSL Fixed"
        
        body = """
🎉 SUCCESS! Email is working!

This test email was sent with aggressive SSL fix for Python 3.13.

Your portfolio contact form should now work properly.

---
Test from Django Portfolio
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        print("📤 Sending test email...")
        server.sendmail(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_USER, msg.as_string())
        server.quit()
        
        print("✅ EMAIL SENT SUCCESSFULLY!")
        print("📋 Check your inbox: vitalivo@gmail.com")
        return True
        
    except Exception as e:
        print(f"❌ Email failed: {str(e)}")
        print(f"❌ Error type: {type(e).__name__}")
        
        # Показываем детальную информацию
        import traceback
        traceback.print_exc()
        
        # Пробуем альтернативный метод
        return test_resend_api()

def test_resend_api():
    """Тест через Resend API"""
    print("\n🔄 Trying Resend API as alternative...")
    
    try:
        import requests
        
        api_key = os.getenv('RESEND_API_KEY')
        if not api_key:
            print("❌ RESEND_API_KEY not found in environment")
            print("💡 Get API key from https://resend.com")
            return False
        
        print(f"🔑 Using Resend API key: {api_key[:10]}...")
        
        response = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'from': 'portfolio@resend.dev',
                'to': ['vitalivo@gmail.com'],
                'subject': '🧪 Portfolio Contact Test - Resend API',
                'html': '''
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">🎉 Resend API Test Successful!</h2>
                    <p>This email was sent using Resend API as an alternative to SMTP.</p>
                    <p>Your portfolio contact form can now use this method if SMTP fails.</p>
                    <hr>
                    <p><small>Test from Django Portfolio</small></p>
                </div>
                '''
            },
            timeout=10
        )
        
        print(f"📡 Resend response: {response.status_code}")
        print(f"📨 Resend response: {response.text}")
        
        if response.status_code == 200:
            print("✅ RESEND API WORKS!")
            return True
        else:
            print(f"❌ Resend API failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Resend API error: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Starting email tests...\n")
    
    # Проверяем настройки
    print("🔍 Current email settings:")
    print(f"   EMAIL_HOST: {getattr(settings, 'EMAIL_HOST', 'NOT SET')}")
    print(f"   EMAIL_PORT: {getattr(settings, 'EMAIL_PORT', 'NOT SET')}")
    print(f"   EMAIL_HOST_USER: {getattr(settings, 'EMAIL_HOST_USER', 'NOT SET')}")
    print(f"   EMAIL_HOST_PASSWORD: {'SET' if getattr(settings, 'EMAIL_HOST_PASSWORD', None) else 'NOT SET'}")
    print(f"   RESEND_API_KEY: {'SET' if os.getenv('RESEND_API_KEY') else 'NOT SET'}")
    
    print("\n" + "="*50)
    
    # Тест 1: SMTP с SSL fix
    smtp_success = test_email_with_aggressive_ssl_fix()
    
    print(f"\n📊 Final Results:")
    print(f"SMTP Email: {'✅ SUCCESS' if smtp_success else '❌ FAILED'}")
    
    if smtp_success:
        print(f"\n🎉 Email is working! Check your inbox.")
    else:
        print(f"\n😞 Email still not working. Try these solutions:")
        print(f"1. Get Resend API key from https://resend.com")
        print(f"2. Check Gmail app password is correct")
        print(f"3. Try different email provider")
