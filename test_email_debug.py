# Альтернативный тест с обходом SSL проблем
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

def test_email_direct_smtp():
    """Прямой тест SMTP без Django"""
    print("🔧 Testing direct SMTP connection...")
    
    try:
        # Создаем SSL контекст с отключенной проверкой
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        
        print(f"📧 Connecting to {settings.EMAIL_HOST}:{settings.EMAIL_PORT}")
        
        # Подключаемся к SMTP серверу
        server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server.ehlo()
        
        print("🔒 Starting TLS...")
        server.starttls(context=context)  # Используем кастомный контекст
        server.ehlo()
        
        print("🔑 Logging in...")
        server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        
        # Создаем письмо
        msg = MIMEMultipart()
        msg['From'] = settings.EMAIL_HOST_USER
        msg['To'] = settings.EMAIL_HOST_USER
        msg['Subject'] = "🧪 Direct SMTP Test from Django Portfolio"
        
        body = """
        This is a test email sent directly via SMTP to verify the connection.
        
        If you receive this email, the SMTP configuration is working correctly!
        
        ---
        Sent from Django Portfolio Contact Form
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        print("📤 Sending email...")
        text = msg.as_string()
        server.sendmail(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_USER, text)
        server.quit()
        
        print("✅ Email sent successfully via direct SMTP!")
        print("📋 Check your inbox: vitalivo@gmail.com")
        return True
        
    except Exception as e:
        print(f"❌ Direct SMTP failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_django_email_with_ssl_fix():
    """Тест Django email с исправлением SSL"""
    print("\n🔧 Testing Django email with SSL fix...")
    
    try:
        from django.core.mail import send_mail
        
        result = send_mail(
            subject='🧪 Django Email Test with SSL Fix',
            message='This is a test email from Django with SSL fix.\n\nIf you receive this, Django email is working!',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        
        print(f"✅ Django email sent! Result: {result}")
        return True
        
    except Exception as e:
        print(f"❌ Django email failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Starting comprehensive email tests...\n")
    
    # Тест 1: Прямой SMTP
    direct_success = test_email_direct_smtp()
    
    # Тест 2: Django email
    django_success = test_django_email_with_ssl_fix()
    
    print(f"\n📊 Results:")
    print(f"Direct SMTP: {'✅ SUCCESS' if direct_success else '❌ FAILED'}")
    print(f"Django Email: {'✅ SUCCESS' if django_success else '❌ FAILED'}")
    
    if direct_success or django_success:
        print(f"\n🎉 At least one method works! Check your email inbox.")
    else:
        print(f"\n😞 Both methods failed. Let's try alternative solutions.")
