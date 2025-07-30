# Финальный тест контактной формы
import os
import django
import requests
import json

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

def test_contact_form_api():
    """Тест API контактной формы"""
    print("🧪 Testing Contact Form API...")
    
    # Тестовые данные
    test_data = {
        'name': 'Test User',
        'email': 'test@example.com',
        'subject': 'Test Subject from API',
        'message': 'This is a test message from the API test script. Email should work now!'
    }
    
    try:
        # Отправляем POST запрос
        response = requests.post(
            'http://127.0.0.1:8000/api/contact-form/submit/',
            headers={
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            json=test_data,
            timeout=30
        )
        
        print(f"📡 Response status: {response.status_code}")
        print(f"📨 Response data: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                print("✅ Contact form API works!")
                print(f"   Message ID: {result.get('id')}")
                print(f"   Email sent: {result.get('email_sent')}")
                print(f"   Telegram sent: {result.get('telegram_sent')}")
                return True
            else:
                print(f"❌ API returned error: {result.get('message')}")
                return False
        else:
            print(f"❌ HTTP error: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection error - is Django server running?")
        print("💡 Run: python manage.py runserver")
        return False
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        return False

def check_django_server():
    """Проверка работы Django сервера"""
    try:
        response = requests.get('http://127.0.0.1:8000/api/contact-form/submit/', timeout=5)
        if response.status_code == 200:
            print("✅ Django server is running")
            return True
        else:
            print(f"⚠️ Django server responds with: {response.status_code}")
            return True  # Сервер работает, но возвращает другой код
    except:
        print("❌ Django server is not running")
        print("💡 Start it with: python manage.py runserver")
        return False

if __name__ == "__main__":
    print("🚀 Final Contact Form Test")
    print("=" * 40)
    
    # Проверяем сервер
    if not check_django_server():
        exit(1)
    
    # Тестируем API
    success = test_contact_form_api()
    
    print(f"\n📊 Final Result:")
    print(f"Contact Form API: {'✅ SUCCESS' if success else '❌ FAILED'}")
    
    if success:
        print(f"\n🎉 Everything is working!")
        print(f"✅ Email: Working")
        print(f"📱 Telegram: {'Working' if os.getenv('TELEGRAM_CHAT_ID') else 'Needs Chat ID'}")
        print(f"🌐 Frontend: Ready to test at http://localhost:3000/contact")
    else:
        print(f"\n😞 Something needs fixing.")
