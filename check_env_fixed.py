# Исправленная версия с правильной кодировкой
import os
from pathlib import Path

def check_env_file_fixed():
    """Проверка .env файла с правильной кодировкой"""
    print("🔍 Checking .env file location...")
    
    # Текущая директория
    current_dir = Path.cwd()
    print(f"📁 Current directory: {current_dir}")
    
    # Проверяем разные места
    env_locations = [
        current_dir / '.env',
        current_dir / 'portfolio_backend' / '.env',
        current_dir.parent / '.env'
    ]
    
    for env_path in env_locations:
        if env_path.exists():
            print(f"✅ Found .env at: {env_path}")
            
            try:
                # Читаем с UTF-8 кодировкой
                with open(env_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    print(f"📋 Content preview (UTF-8):")
                    for line in content.split('\n')[:15]:  # Первые 15 строк
                        if line.strip():
                            print(f"   {line}")
            except UnicodeDecodeError:
                try:
                    # Пробуем с cp1251 (русская кодировка)
                    with open(env_path, 'r', encoding='cp1251') as f:
                        content = f.read()
                        print(f"📋 Content preview (CP1251):")
                        for line in content.split('\n')[:15]:
                            if line.strip():
                                print(f"   {line}")
                except Exception as e:
                    print(f"❌ Cannot read file: {e}")
                    print("🔧 File has encoding issues - will recreate it")
        else:
            print(f"❌ Not found at: {env_path}")
    
    # Проверяем переменные окружения
    print(f"\n🔍 Current environment variables:")
    print(f"   TELEGRAM_BOT_TOKEN: {os.getenv('TELEGRAM_BOT_TOKEN', 'NOT SET')}")
    print(f"   TELEGRAM_CHAT_ID: {os.getenv('TELEGRAM_CHAT_ID', 'NOT SET')}")
    print(f"   GMAIL_USER: {os.getenv('GMAIL_USER', 'NOT SET')}")

def create_clean_env_file():
    """Создать чистый .env файл с правильной кодировкой"""
    print("\n🔧 Creating clean .env file...")
    
    env_content = """# Gmail SMTP настройки (РАБОТАЕТ!)
GMAIL_USER=vitalivo@gmail.com
GMAIL_APP_PASSWORD=avsx tsjl brds cmlf

# Resend API (резерв)
RESEND_API_KEY=re_XD4M64CE_G3U51vTindYeXuVN4XdaRuds

# Telegram Bot (ОБНОВЛЕНО!)
TELEGRAM_BOT_TOKEN=8447589158:AAF23a8ZvDBkZYLdfOL4t2p6j8AEsW9_ZKA
TELEGRAM_CHAT_ID=769259836

# Django
DEBUG=True
SECRET_KEY=django-insecure-your-secret-key-here
"""
    
    try:
        # Создаем файл с UTF-8 кодировкой
        with open('.env', 'w', encoding='utf-8') as f:
            f.write(env_content)
        
        print("✅ Clean .env file created successfully!")
        
        # Проверяем, что файл читается
        with open('.env', 'r', encoding='utf-8') as f:
            content = f.read()
            print("📋 New .env content:")
            for line in content.split('\n')[:10]:
                if line.strip():
                    print(f"   {line}")
                    
        return True
        
    except Exception as e:
        print(f"❌ Failed to create .env file: {e}")
        return False

if __name__ == "__main__":
    check_env_file_fixed()
    
    # Предлагаем пересоздать файл
    response = input("\n❓ Recreate clean .env file? (y/n): ").lower()
    if response == 'y':
        create_clean_env_file()
