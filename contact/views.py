# Обновляем views.py с исправленной функцией Telegram
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import requests
from .models import ContactMessage
from .email_utils import send_contact_email_direct

@csrf_exempt
@require_http_methods(["POST", "GET"])
def contact_submit(request):
    """Обработка контактной формы"""
    if request.method == "GET":
        return JsonResponse({
            'message': 'Contact API endpoint is working!',
            'method': 'POST',
            'required_fields': ['name', 'email', 'subject', 'message']
        })

    try:
        print("📨 Received contact form submission")
        
        # Парсим JSON данные
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Invalid JSON data'
            }, status=400)

        print(f"📋 Request data: {data}")

        # Получаем данные
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        print(f"👤 Name: {name}")
        print(f"📧 Email: {email}")
        print(f"📝 Subject: {subject}")

        # Простая валидация
        errors = {}
        if len(name) < 2:
            errors['name'] = ['Name must be at least 2 characters']
        if '@' not in email or '.' not in email:
            errors['email'] = ['Please enter a valid email address']
        if len(subject) < 5:
            errors['subject'] = ['Subject must be at least 5 characters']
        if len(message) < 10:
            errors['message'] = ['Message must be at least 10 characters']

        if errors:
            print(f"❌ Validation errors: {errors}")
            return JsonResponse({
                'success': False,
                'errors': errors,
                'message': 'Please fix the errors below.'
            }, status=400)

        # Сохраняем в базу данных
        contact_message = ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message,
            ip_address=get_client_ip(request)
        )

        print(f"💾 Message saved with ID: {contact_message.id}")

        # Отправляем email через улучшенный метод
        print("📧 Attempting to send email...")
        email_sent = send_contact_email_direct(name, email, subject, message)

        # Отправляем в Telegram с ИСПРАВЛЕННОЙ функцией
        print("📱 Attempting to send Telegram...")
        telegram_sent = send_telegram_message_fixed(name, email, subject, message)

        print("✅ Contact message processed successfully")
        print(f"📧 Email sent: {email_sent}")
        print(f"📱 Telegram sent: {telegram_sent}")

        return JsonResponse({
            'success': True,
            'message': 'Thank you for your message! I will get back to you soon.',
            'id': contact_message.id,
            'email_sent': email_sent,
            'telegram_sent': telegram_sent
        })

    except Exception as e:
        print(f"❌ Contact form error: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'success': False,
            'message': 'Something went wrong. Please try again later.'
        }, status=500)

def get_client_ip(request):
    """Получить IP адрес клиента"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def send_telegram_message_fixed(name, email, subject, message):
    """ИСПРАВЛЕННАЯ отправка в Telegram"""
    try:
        from django.conf import settings
        
        # Получаем настройки ПРАВИЛЬНО
        bot_token = getattr(settings, 'TELEGRAM_BOT_TOKEN', None)
        chat_id = getattr(settings, 'TELEGRAM_CHAT_ID', None)
        
        print(f"🔍 Telegram settings check:")
        print(f"   Bot token: {bot_token}")
        print(f"   Chat ID: {chat_id}")
        
        if not bot_token or not chat_id:
            print("❌ Telegram credentials not configured")
            return False

        # Проверяем, что это не тестовые данные
        if str(bot_token).startswith('1234567890'):
            print("❌ Using test bot token!")
            return False
            
        if str(chat_id) == '123456789':
            print("❌ Using test chat ID!")
            return False

        # Форматируем сообщение для Telegram
        telegram_text = f"""🔔 *New Portfolio Contact*

👤 *Name:* {name}
📧 *Email:* {email}
📝 *Subject:* {subject}

💬 *Message:*
{message}

---
📅 From portfolio contact form
🌐 vitaliyvoloshin.com
        """

        print(f"📱 Sending to Telegram...")
        print(f"   URL: https://api.telegram.org/bot{bot_token}/sendMessage")
        print(f"   Chat ID: {chat_id}")

        # Отправляем в Telegram
        response = requests.post(
            f'https://api.telegram.org/bot{bot_token}/sendMessage',
            json={
                'chat_id': chat_id,
                'text': telegram_text,
                'parse_mode': 'Markdown'
            },
            timeout=10
        )

        print(f"📱 Telegram response: {response.status_code}")
        print(f"📱 Telegram response body: {response.text}")

        if response.status_code == 200:
            print("✅ Telegram sent successfully!")
            return True
        else:
            print(f"❌ Telegram error: {response.text}")
            
            # Пробуем без Markdown если не получилось
            response2 = requests.post(
                f'https://api.telegram.org/bot{bot_token}/sendMessage',
                json={
                    'chat_id': chat_id,
                    'text': f"New Portfolio Contact\n\nName: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}"
                },
                timeout=10
            )
            
            if response2.status_code == 200:
                print("✅ Telegram sent successfully (without Markdown)")
                return True
            else:
                print(f"❌ Telegram failed again: {response2.text}")
                return False

    except Exception as e:
        print(f"❌ Telegram failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
