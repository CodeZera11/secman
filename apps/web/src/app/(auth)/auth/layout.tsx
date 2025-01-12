export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="primary-gradient h-full w-full flex items-center justify-center">
      {children}
    </div>
  )
}