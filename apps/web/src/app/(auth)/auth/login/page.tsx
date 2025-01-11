import CardWrapper from "@/components/common/card-wrapper"
import { PageRoutes } from "@/constants/page-routes"
import LoginForm from "@/forms/auth/login-form"

const LoginPage = () => {
  return (
    <CardWrapper
      headerLabel="Auth"
      subHeaderLabel="Welcome back!"
      backButtonLabel="Create an account"
      backButtonHref={PageRoutes.AUTH.REGISTER}
      showSocials
    >
      <LoginForm />
    </CardWrapper >
  )
}

export default LoginPage