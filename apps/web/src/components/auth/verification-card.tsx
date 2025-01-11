"use client"

import { verifyEmail } from '@/actions/verify-email'
import CardWrapper from '../common/card-wrapper'
import { PageRoutes } from '@/constants/page-routes'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from "react-spinners"
import FormSuccess from '../common/form-success'
import FormError from '../common/form-error'

const VerificationCard = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const handleVerification = useCallback(async () => {
    if (!token) {
      setError('No token found');
      return;
    }

    verifyEmail(token).then((data) => {
      setSuccess(data.success)
      setError(data.error)
    });
  }, [token])

  useEffect(() => {
    // if (!success && !error) {
    handleVerification();
  }, [])

  return (
    <CardWrapper
      headerLabel='Auth'
      subHeaderLabel='Confirming your email'
      backButtonHref={PageRoutes.AUTH.LOGIN}
      backButtonLabel="Back to login"
    >
      <div className='flex items-center justify-center'>
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}

export default VerificationCard