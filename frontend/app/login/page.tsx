import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Login - BR. Premium Footwear",
  description: "Sign in to your account to access exclusive features and track your orders",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 lg:py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-serif mb-3">Welcome Back</h1>
            <p className="text-muted-foreground text-lg">Sign in to your account to continue</p>
          </div>

          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
