import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"

export const metadata = {
  title: "Create Account - BR. Premium Footwear",
  description: "Join BR. to access exclusive products and personalized shopping experience",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 lg:py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-serif mb-3">Create Account</h1>
            <p className="text-muted-foreground text-lg">Join us for exclusive access and benefits</p>
          </div>

          <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
