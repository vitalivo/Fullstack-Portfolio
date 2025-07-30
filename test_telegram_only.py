# Тест только Telegram
import os
import django
import requests

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.conf import settings

def test_telegram_direct():
    """Прямой тест Telegram"""
    print("📱 Testing Telegram directly...")
    
    # Получаем данные из настроек
    bot_token = getattr(settings, 'TELEGRAM_BOT_TOKEN', None)
    chat_id = getattr(settings, 'TELEGRAM_CHAT_ID', None)
    
    print(f"🔍 Current settings:")
    print(f"   Bot token: {bot_token}")
    print(f"   Chat ID: {chat_id}")
    
    if not bot_token or not chat_id:
        print("❌ Telegram credentials not found in Django settings")
        return False
    
    # Проверяем, что это правильные данные
    if bot_token.startswith('1234567890'):
        print("❌ Using test data! Update .env file and restart Django")
        return False
    
    try:
        # Отправляем тестовое сообщение
        test_message = """
🧪 **Telegram Test Message**

✅ Bot Token: Working
✅ Chat ID: Working  
✅ Django Settings: Updated

Your portfolio contact form Telegram notifications are now working!

---
Test from Django Portfolio
        """
        
        response = requests.post(
            f'https://api.telegram.org/bot{bot_token}/sendMessage',
            json={
                'chat_id': chat_id,
                'text': test_message,
                'parse_mode': 'Markdown'
            },
            timeout=10
        )
        
        print(f"📱 Response: {response.status_code}")
        print(f"📱 Body: {response.text}")
        
        if response.status_code == 200:
            print("✅ Telegram test successful!")
            return True
        else:
            print(f"❌ Telegram failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Telegram error: {str(e)}")
        return False

if __name__ == "__main__":
    test_telegram_direct()

