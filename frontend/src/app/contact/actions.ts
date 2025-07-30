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

// Простая валидация без zod
function validateContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}): { isValid: boolean; errors: ContactFormState["errors"] } {
  const errors: ContactFormState["errors"] = {}

  // Валидация имени
  if (!data.name || data.name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters"]
  }

  // Валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = ["Please enter a valid email address"]
  }

  // Валидация темы
  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = ["Subject must be at least 5 characters"]
  }

  // Валидация сообщения
  if (!data.message || data.message.trim().length < 10) {
    errors.message = ["Message must be at least 10 characters"]
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Получаем данные из формы
  const rawData = {
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    subject: (formData.get("subject") as string) || "",
    message: (formData.get("message") as string) || "",
  }

  // Валидируем данные
  const validation = validateContactForm(rawData)

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      message: "Please fix the errors below.",
    }
  }

  try {
    // Имитируем отправку email
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Contact form submitted:", rawData)

    return {
      success: true,
      message: "Thank you for your message! I will get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
