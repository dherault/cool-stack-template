import Spinner from '~components/common/Spinner'
import LandingLayout from '~components/landing/LandingLayout'

function LandingLoading() {
  return (
    <LandingLayout>
      <div className="h-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    </LandingLayout>
  )
}

export default LandingLoading
