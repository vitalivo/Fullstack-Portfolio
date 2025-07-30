"use server"

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
}

// Простая валидация на фронтенде
function validateContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}): { isValid: boolean; errors: ContactFormState["errors"] } {
  const errors: ContactFormState["errors"] = {}

  if (!data.name || data.name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters"]
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = ["Please enter a valid email address"]
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = ["Subject must be at least 5 characters"]
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = ["Message must be at least 10 characters"]
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const rawData = {
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    subject: (formData.get("subject") as string) || "",
    message: (formData.get("message") as string) || "",
  }

  console.log("📤 Submitting contact form:", rawData)

  // Валидация на фронтенде
  const validation = validateContactForm(rawData)
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      message: "Please fix the errors below.",
    }
  }

  try {
    // Отправляем на Django backend (ОБНОВЛЕННЫЙ URL!)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    const response = await fetch(`${apiUrl}/api/contact-form/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(rawData),
    })

    console.log("📡 Response status:", response.status)

    const result = await response.json()
    console.log("📨 Response data:", result)

    if (response.ok && result.success) {
      console.log("✅ Contact form submitted successfully:", {
        id: result.id,
        emailSent: result.email_sent,
        telegramSent: result.telegram_sent,
      })

      return {
        success: true,
        message: result.message || "Thank you for your message! I will get back to you soon.",
      }
    } else {
      // Обрабатываем ошибки валидации от Django
      if (result.errors) {
        return {
          success: false,
          errors: result.errors,
          message: result.message || "Please fix the errors below.",
        }
      }

      return {
        success: false,
        message: result.message || "Something went wrong. Please try again later.",
      }
    }
  } catch (error) {
    console.error("❌ Network error submitting contact form:", error)
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    }
  }
}
