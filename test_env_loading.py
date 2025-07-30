# Тест загрузки переменных окружения
import os
from pathlib import Path
from dotenv import load_dotenv

def test_env_loading():
    """Тест загрузки .env файла"""
    print("🧪 Testing .env file loading...")
    
    # Очищаем существующие переменные
    for key in ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID', 'GMAIL_USER']:
        if key in os.environ:
            del os.environ[key]
    
    print("🔄 Cleared existing environment variables")
    
    # Загружаем .env файл
    env_path = Path('.env')
    if env_path.exists():
        print(f"📁 Loading .env from: {env_path.absolute()}")
        
        # Загружаем с override=True
        result = load_dotenv(env_path, override=True, encoding='utf-8')
        print(f"📋 load_dotenv result: {result}")
        
        # Проверяем переменные
        print(f"\n✅ Environment variables after loading:")
        print(f"   TELEGRAM_BOT_TOKEN: {os.getenv('TELEGRAM_BOT_TOKEN', 'NOT LOADED')}")
        print(f"   TELEGRAM_CHAT_ID: {os.getenv('TELEGRAM_CHAT_ID', 'NOT LOADED')}")
        print(f"   GMAIL_USER: {os.getenv('GMAIL_USER', 'NOT LOADED')}")
        
        # Проверяем, что это правильные данные
        bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        if bot_token and bot_token.startswith('8447589158'):
            print("✅ Correct Telegram bot token loaded!")
        else:
            print("❌ Wrong or missing Telegram bot token")
            
        return True
    else:
        print("❌ .env file not found")
        return False

if __name__ == "__main__":
    test_env_loading()

