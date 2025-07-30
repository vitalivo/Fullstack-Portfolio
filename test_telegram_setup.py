# Создай этот файл для настройки Telegram
import requests

def setup_telegram_bot():
    """Пошаговая настройка Telegram бота"""
    print("🤖 Telegram Bot Setup Guide")
    print("=" * 40)
    
    print("\n1️⃣ Create a bot:")
    print("   - Open Telegram and search for @BotFather")
    print("   - Send /newbot command")
    print("   - Choose a name for your bot")
    print("   - Choose a username (must end with 'bot')")
    print("   - Copy the token you receive")
    
    bot_token = input("\n📝 Enter your bot token: ").strip()
    
    if not bot_token:
        print("❌ Bot token is required!")
        return
    
    # Проверяем токен
    print(f"\n🔍 Testing bot token...")
    try:
        response = requests.get(f'https://api.telegram.org/bot{bot_token}/getMe', timeout=10)
        if response.status_code == 200:
            bot_info = response.json()
            print(f"✅ Bot token is valid!")
            print(f"   Bot name: {bot_info['result']['first_name']}")
            print(f"   Bot username: @{bot_info['result']['username']}")
        else:
            print(f"❌ Invalid bot token: {response.text}")
            return
    except Exception as e:
        print(f"❌ Error testing bot token: {e}")
        return
    
    print(f"\n2️⃣ Get your Chat ID:")
    print(f"   - Send a message to your bot: @{bot_info['result']['username']}")
    print(f"   - Send any message (like 'Hello')")
    
    input("Press Enter after sending a message to your bot...")
    
    # Получаем обновления
    try:
        response = requests.get(f'https://api.telegram.org/bot{bot_token}/getUpdates', timeout=10)
        if response.status_code == 200:
            updates = response.json()
            if updates['result']:
                chat_id = updates['result'][-1]['message']['chat']['id']
                print(f"✅ Found your Chat ID: {chat_id}")
                
                # Тестируем отправку
                test_response = requests.post(
                    f'https://api.telegram.org/bot{bot_token}/sendMessage',
                    json={
                        'chat_id': chat_id,
                        'text': '🎉 Telegram bot is working! Your portfolio contact form is now connected.'
                    },
                    timeout=10
                )
                
                if test_response.status_code == 200:
                    print("✅ Test message sent successfully!")
                    
                    print(f"\n📋 Add these to your .env file:")
                    print(f"TELEGRAM_BOT_TOKEN={bot_token}")
                    print(f"TELEGRAM_CHAT_ID={chat_id}")
                    
                    return bot_token, chat_id
                else:
                    print(f"❌ Failed to send test message: {test_response.text}")
            else:
                print("❌ No messages found. Please send a message to your bot first.")
        else:
            print(f"❌ Failed to get updates: {response.text}")
    except Exception as e:
        print(f"❌ Error getting chat ID: {e}")

if __name__ == "__main__":
    setup_telegram_bot()
