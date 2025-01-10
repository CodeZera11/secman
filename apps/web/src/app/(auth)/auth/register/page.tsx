import CardWrapper from "@/components/auth/card-wrapper"
import { PageRoutes } from "@/constants/page-routes"
import RegisterForm from "@/forms/auth/register-form"

const RegisterPage = () => {
  return (
    <CardWrapper
      headerLabel="Register"
      backButtonLabel="Back to login"
      backButtonHref={PageRoutes.AUTH.LOGIN}
      showSocials
    >
      <RegisterForm />
    </CardWrapper >
  )
}

export default RegisterPage